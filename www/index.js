import * as wasm from 'shc-wasm';
import './index.css';

const Handlebars = require('handlebars');
// At this point it's kind of a question of why use rust at all?
import { KJUR, b64utohex } from 'jsrsasign';
const pica = require('pica')();

wasm.main();

const waiting_period = 14;

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    if (arg1 === arg2) {
        if (typeof(options.fn) === 'function') {
            return options.fn(this);
        }
        return true;
    } else {
        if (typeof(options.inverse) === 'function') {
            return options.inverse(this);
        }
        return false;
    }
});

// Rust properties we're allowed to access
const handlebar_props = {
    allowedProtoProperties: {
        mark: true,
        text: true,
        code: true,
        date: true,
        location: true,
        lot: true,
    }
}

const template = Handlebars.compile(`
<tr class='patient'><td class='patient name cl-blue' colspan=3>{{name}}</td></tr>
<tr><td class='patient-dob' colspan=3>{{dob}}</td></tr>
{{#each vax}}
    <tr class='detail_status'>
        {{#ifEquals mark 'green'}}
            <td class='vax-status cl-green' rowspan=2>&#x2713;</td>
        {{/ifEquals}}
        {{#ifEquals mark 'yellow'}}
            <td class='vax-status cl-yellow' rowspan=2>&#x203c;</td>
        {{/ifEquals}}
        {{#ifEquals mark 'red'}}
            <td class='vax-status cl-red' rowspan=2>&#x2718;</td>
        {{/ifEquals}}
        <td colspan='2' class='vax-name cl-yellow'>{{code}}</td>
    </tr>
    <tr class='detail_status'>
        <td class='vax-lot' title='Lot: {{lot}}'>{{lot}}</td>
        <td class='vax-location'>{{location}} ({{date}})</td>
    </tr>
{{/each}}
{{#each status}}
    <tr class='detail_status' id='vax-status-row'>
        {{#ifEquals mark 'green'}}
            <td class='vax-status cl-green'>&#x2713;</td>
        {{/ifEquals}}
        {{#ifEquals mark 'yellow'}}
            <td class='vax-status cl-yellow'>&#x203c;</td>
        {{/ifEquals}}
        {{#ifEquals mark 'red'}}
            <td class='vax-status cl-red'>&#x2718;</td>
        {{/ifEquals}}
        <td colspan=2>{{text}}</td>
    </tr>
{{/each}}
{{#ifEquals vax_okay (ifEquals valid_sig (ifEquals is_cadph true)) }}
    <tr class='smile_status active'><td class='cl-green' colspan=4>&#x263A;</td></tr>
{{else}}
    <tr class='smile_status active'><td class='cl-red' colspan=4>&#x2639;</td></tr>
{{/ifEquals}}
<tr class='smile_status active'><td colspan=4 style='font-size: 14pt'>Tap for details</td></tr>
`);

class BrowserSide {
    static file_changed() {
        BrowserSide.update_status('Loading…');
    
        let input, file, fr, img;
    
        if (typeof window.FileReader !== 'function') {
            BrowserSide.update_status("The file API isn't supported on this browser yet.");
            return;
        }
    
        input = document.getElementById('imgfile');
        if (!input) {
            BrowserSide.update_status("Couldn't find the imgfile element.");
        }
        else if (!input.files) {
            BrowserSide.update_status("This browser doesn't seem to support the `files` property of file inputs.");
        }
        else if (!input.files[0]) {
            BrowserSide.update_status("Please select a file before clicking 'Load'");
        }
        else {
            file = input.files[0];
            fr = new FileReader();
            fr.onload = createImage;
            fr.readAsDataURL(file);
        }
    
        function createImage() {
            img = new Image();
            img.onload = BrowserSide.image_loaded;
            img.src = fr.result;
        }
    
    }

    static async image_loaded(event) {
        let img = event.target;
    
        BrowserSide.update_status("Scanning for QR codes");
    
        let universe = wasm.Universe.new();
    
        let image_data = await BrowserSide.resize_image(img);
    
        let parse_error = universe.parse(image_data);
        if (typeof(parse_error) !== 'undefined') {
            BrowserSide.update_status("No Smart Health Card found: QR is not a valid Smart Health Card");
            return;
        }
        
        let error_string = universe.update();
        if (error_string) {
            BrowserSide.update_status(error_string);
            return;
        }
    
        let count = universe.imm_count();
        if (count === 1) {
            BrowserSide.update_status("Found 1 record");
        } else {
            BrowserSide.update_status(`Found ${count} records`);
        }
    
        let name = universe.patient_name();
    
        let meta = { name, dob: null, vax: [], status: [] };
    
        for (let detail of universe.vax_detail()) {
            meta.vax.push(detail);
        }
    
        let vax_status = universe.vax_status();
        if (vax_status) {
            meta.status.push(vax_status)
        }
    
        meta.is_cadph = universe.issuer_is_calif_dph();
        if (meta.is_cadph === false) {
            meta.status.push({mark: 'red', text: 'Not issued by the California Department of Public Health'})
            
            BrowserSide.update_table(template(meta, handlebar_props));
            BrowserSide.update_status();
        } else {
            BrowserSide.update_status("Verifying signature");
    
            fetch(`${universe.issuer()}/.well-known/jwks.json`)
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response;
                })
                .then(response => response.json())
                .then(raw_key => {
                    if ((typeof(raw_key.keys) === 'undefined') || !(raw_key.keys.length > 0)) {
                        meta.status.push({mark: 'red', text: 'Unverified, public key could not be fetched'})
                        return(meta);
                    }
    
                    {
                        let data = universe.data();
                        let kid = universe.kid();
                        let parts = data.split('.');
                        let header = parts[0];
                        let payload = parts[1];
                        let signature = parts[2];
                        let key_match = false;
        
                        let keys = raw_key.keys.reduce(function(acc, val) {
                            acc[val['kid']] = val;
                            return acc;
                        }, {});
        
                        let key;
        
                        if (typeof(kid) !== 'undefined') {
                            // A KID was specified, let's look for that key
                            key = keys[kid];
                            if (typeof(key) !== 'undefined') {
                                // console.log("We have the right key");
                                key_match = true;
                            } else {
                                console.error("We don't have this key");
                            }
                        }
        
                        if (key_match === false) {
                            console.error("Take the first key we've got");
                            key = raw_key.keys[0]
                            if (typeof(key) === 'undefined') {
                                // console.error('No key found, abort validation')
                                meta.status.push({mark: 'red', text: 'Unverified, public key could not be fetched'})
                                return(meta);
                            }
                        }
        
                        let sig = new KJUR.crypto.Signature({'alg': 'SHA256withECDSA'});
                        sig.init(key);
                        sig.updateString(`${header}.${payload}`);
        
                        let asn1_sig = KJUR.crypto.ECDSA.concatSigToASN1Sig(b64utohex(signature));
                        var isSignValid = sig.verify(asn1_sig);
    
                        if (isSignValid === false) {
                            meta.valid_sig = false;
                            meta.status.push({mark: 'red', text: 'Not issued by the California Department of Public Health'})
                        } else if ((isSignValid === true) && (key_match === false)) {
                            meta.valid_sig = false;
                            meta.status.push({mark: 'yellow', text: 'Potentially issued by the California Department of Public Health, key thumbprint mismatch'})
                        } else if ((isSignValid === true) && (key_match === true)) {
                            meta.valid_sig = true;
                            meta.status.push({mark: 'green', text: 'Issued by the California Department of Public Health'})
                        }
                    }
                    return(meta);
                })
                .then(meta => {
                    BrowserSide.update_table(template(meta, handlebar_props));
                    BrowserSide.update_status();
                })
                .catch(error => {
                    meta.status.push({mark: 'red', text: 'Unverified, public key could not be fetched'});
    
                    BrowserSide.update_table(template(meta, handlebar_props));
                    BrowserSide.update_status();
                });
        }        
    }    

    static toggle_row_on(e) {
        let classes = new Set(e.classList);
        classes.add('active');
        e.className = [...classes].join(' ');
    }
    
    static toggle_row_off(e) {
        let classes = new Set(e.classList);
        classes.delete('active');
        e.className = [...classes].join(' ');
    }

    static async resize_image(img) {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        // const long_side = 525;
        const long_side = 1024;
        const output_mime_type = 'image/png';
    
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
    
        let resize = true;
        let width, ratio, height;
        if (img.width >= img.height) {
            width = long_side;
            ratio = width / img.width;
            height = Math.round(img.height * ratio);
    
            if (width >= img.width) {
                resize = false;
            }
        } else {
            height = long_side;
            ratio = height / img.height;
            width = Math.round(img.width * ratio);
    
            if (height >= img.height) {
                resize = false;
            }
        }
    
        if (resize === true) {
            canvas.height = height;
            canvas.width = width;
            await pica.resize(img, canvas, { quality: 3, unsharpAmount: 0 })
              .then(result => console.log('resize done!', result));
        }
    
        let data = canvas.toDataURL(output_mime_type).replace(`data:${output_mime_type};base64,`, '');
        return data;
    }

    static update_table(text) {
        if (text == '') {
            document.getElementById('vax-body').innerHTML = '';
            document.getElementById('vax').style.visibility = 'hidden';
        } else {
            document.getElementById('vax-body').innerHTML = text;
            document.getElementById('vax').style.visibility = 'visible';
        }
    }

    static update_status(text) {
        let e = document.getElementById('status');
    
        if (typeof(text) === 'undefined') {
            e.innerHTML = '…';
            e.style.display = 'none';
        } else {
            e.innerHTML = text;
            e.style.display = 'block';
        }
    }
}


document.getElementById('vax-body').addEventListener('click', function (event) {
    const parent = event.target.parentElement;

    if (parent.classList.contains('smile_status')) {
        Array.prototype.map.call(document.getElementsByClassName('detail_status'), BrowserSide.toggle_row_on);
        Array.prototype.map.call(document.getElementsByClassName('smile_status'), BrowserSide.toggle_row_off);
    } else if (parent.classList.contains('detail_status')) {
        Array.prototype.map.call(document.getElementsByClassName('detail_status'), BrowserSide.toggle_row_off);
        Array.prototype.map.call(document.getElementsByClassName('smile_status'), BrowserSide.toggle_row_on);
    }
  });

document.getElementById('imgfile').onchange = function() {
    BrowserSide.update_table('');

    setTimeout(BrowserSide.file_changed, 100);
};
