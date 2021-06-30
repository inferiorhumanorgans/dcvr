extern crate shc_decode as shc;
mod utils;

use wasm_bindgen::prelude::*;

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! con_log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// In days
const WAITING_PERIOD : i32 = 14;

use shc::{SmartHealthCard, Coding};

trait ImmunizationWasm {
    fn code(&self) -> String;
    fn occurrence(&self) -> String;
    fn provider(&self) -> String;
    fn completed(&self) -> bool;
    fn is_two_dose(&self) -> Option<bool>;
}

impl ImmunizationWasm for shc::Immunization<'static> {
    fn code(&self) -> String {
        self.vaccine_code.to_string()
    }

    // The Biontech and Moderna vaccines require two jabs, assume the others require only one
    fn is_two_dose(&self) -> Option<bool> {
        // ugh constants
        let pfizer_code : Coding = Coding::from_uri_and_code("http://hl7.org/fhir/sid/cvx", "208");
        let moderna_code : Coding = Coding::from_uri_and_code("http://hl7.org/fhir/sid/cvx", "207");

        match self.vaccine_code.coding.len() {
            1 => {
                let code = &self.vaccine_code.coding[0];
                if code == &pfizer_code {
                    Some(true)
                } else if code == &moderna_code {
                    Some(true)
                } else {
                    Some(false)
                }
            },
            _ => None
        }
    }

    fn occurrence(&self) -> String {
        self.occurrence.to_string()
    }

    fn provider(&self) -> String {
        match self.performer.len() {
            0 => "UNKNOWN".into(),
            _ => self.performer.iter().map(|p| p.to_string()).collect::<Vec<String>>().join("; "),
        }
    }

    fn completed(&self) -> bool {
        self.status == shc::ImmunizationStatus::Completed
    }
}

#[wasm_bindgen]
#[derive(Debug)]
pub struct VaxDetail {
    mark: String,
    code: String,
    date: String,
    location: String,
    lot: String,
}

#[wasm_bindgen]
impl VaxDetail {
    #[wasm_bindgen(getter)]
    pub fn mark(&self) -> String {
        self.mark.clone()
    }

    #[wasm_bindgen(setter)]
    pub fn set_mark(&mut self, id: String) {
        self.mark = id;
    }

    #[wasm_bindgen(getter)]
    pub fn code(&self) -> String {
        self.code.clone()
    }

    #[wasm_bindgen(setter)]
    pub fn set_code(&mut self, id: String) {
        self.code = id;
    }

    #[wasm_bindgen(getter)]
    pub fn date(&self) -> String {
        self.date.clone()
    }

    #[wasm_bindgen(setter)]
    pub fn set_date(&mut self, id: String) {
        self.date = id;
    }

    #[wasm_bindgen(getter)]
    pub fn location(&self) -> String {
        self.location.clone()
    }

    #[wasm_bindgen(setter)]
    pub fn set_location(&mut self, id: String) {
        self.location = id;
    }

    #[wasm_bindgen(getter)]
    pub fn lot(&self) -> String {
        self.lot.clone()
    }

    #[wasm_bindgen(setter)]
    pub fn set_lot(&mut self, id: String) {
        self.lot = id;
    }
}

#[wasm_bindgen]
pub struct StatusEntry {
    mark: String,
    text: String,
}

#[wasm_bindgen]
impl StatusEntry {
    #[wasm_bindgen(getter)]
    pub fn mark(&self) -> String {
        self.mark.clone()
    }

    #[wasm_bindgen(setter)]
    pub fn set_mark(&mut self, id: String) {
        self.mark = id;
    }

    #[wasm_bindgen(getter)]
    pub fn text(&self) -> String {
        self.text.clone()
    }

    #[wasm_bindgen(setter)]
    pub fn set_text(&mut self, id: String) {
        self.text = id;
    }
}

#[wasm_bindgen]
pub struct Universe {
    shc: Option<SmartHealthCard<'static>>,
    immunizations: Vec<shc::Immunization<'static>>,
    patient: Option<shc::Patient>,
    issuer: Option<shc::Issuer>,
    kid: Option<String>,
    data: String,
}

#[wasm_bindgen]
impl Universe {
    pub fn new() -> Self {
        Self {
            shc: None,
            immunizations: vec![],
            patient: None,
            issuer: None,
            kid: None,
            data: "".into(),
        }
    }

    // Parses a base64 encoded image
    // lol working around lack of marshalling for Result type
    pub fn parse(&mut self, encoded: &str) -> Option<String> {
        let data = base64::decode(encoded).unwrap();

        match shc::shc_parse_qr_image(&data, false, &None) {
            Ok((jwt, ehc, kid)) => {
                self.data = jwt;
                self.kid = kid;
                self.shc = Some(ehc);
                None
            },
            Err(err) => Some(err.to_string())
        }
    }

    // Iterates over the SHC struct and pulls out the vaccine entries
    pub fn update(&mut self) -> Option<String> {
        let shc = self.shc.as_ref().unwrap();
        self.issuer = Some(shc.issuer.clone());
        self.immunizations = vec![];
        if let shc::Resource::Bundle(shc::Bundle::Collection(bundle)) = &shc.verifiable_credential.credential_subject.resource {
            let mut patient_id = None;
            for (key, entry) in bundle.entry.iter() {
               match entry {
                    shc::Resource::Immunization(imm) => self.immunizations.push(imm.clone()),
                    shc::Resource::Patient(patient) => {
                        if self.patient.is_none() {
                            self.patient = Some(patient.clone());
                            patient_id = Some(key.clone());
                        } else {
                            return Some("Multiple patients".into());
                        }
                    },
                    _ => {},
               }
            }
            for immunization in self.immunizations.iter() {
                if let Some(patient_id) = patient_id.as_ref() {
                    if let Some(imm_patient_id) = immunization.patient.reference.as_ref() {
                        if imm_patient_id == patient_id {
                            return None
                        }
                    }
                    return Some("Name mismatch".into());
                }
            }

            return None
        } else {
            Some("Incorrect root element".into())
        }
    }

    pub fn data(&self) -> String {
        self.data.clone()
    }

    pub fn issuer(&self) -> Option<String> {
        if let Some(issuer) = self.issuer.as_ref() {
            Some(format!("{}", issuer))
        } else {
            None
        }
    }

    pub fn issuer_is_calif_dph(&self) -> bool {
        match self.issuer {
            Some(shc::Issuer::CalDPHMyVaxRecord) => true,
            _ => false,
        }
    }

    pub fn kid(&self) -> Option<String> {
        self.kid.clone()
    }

    pub fn patient_name(&self) -> Option<String> {
        match self.patient.as_ref() {
            Some(patient) => Some(patient.name.iter().map(|n| n.to_string()).collect::<Vec<String>>().join("; ")),
            None => None,
        }
    }

    pub fn imm_count(&self) -> usize {
        self.immunizations.len()
    }

    // Returns days since the latest vax
    pub fn imm_elapsed_time(&self) -> Option<i32> {
        let now = chrono::Local::today().naive_local();

        if self.immunizations.is_empty() {
            return None
        }

        let latest_vax = self.immunizations.iter()
            .map(|imm| &imm.occurrence)
            .filter_map(|imm| {
                if let shc::ImmunizationOccurrence::DateTime(date) = imm {
                    Some(date.clone())
                } else {
                    None
                }
            })
            .map(|enterprise_datetime| {
                match enterprise_datetime {
                    shc::EnterpriseDateTime::Date(date) => now - date,
                    shc::EnterpriseDateTime::DateTime(date_time) => now - date_time.date().naive_local(),
                }
            })
            .max()
            .expect("Error calculating most recent immunization");

        // If it's been more than 2^32 days since we got vaccinated we've got other problems
        Some(latest_vax.num_days() as i32)
    }

    pub fn imm_code(&self, index: usize) -> String {
        self.immunizations[index].code()
    }

    pub fn imm_occurrence(&self, index: usize) -> String {
        self.immunizations[index].occurrence()
    }

    pub fn imm_provider(&self, index: usize) -> String {
        self.immunizations[index].provider()
    }

    pub fn imm_lot(&self, index: usize) -> String {
        self.immunizations[index].lot_number.clone().unwrap_or("UNKNOWN".into())
    }

    pub fn imm_completed(&self, index: usize) -> bool {
        self.immunizations[index].completed()
    }

    pub fn imm_is_two_dose(&self, index: usize) -> Option<bool> {
        self.immunizations[index].is_two_dose()
    }

    pub fn vax_detail(&self) -> js_sys::Array {
        self.immunizations.iter()
            .map(|imm| {
                VaxDetail {
                    mark: match imm.completed() { true => "green".into(), false => "red".into() },
                    code: imm.code(),
                    date: imm.occurrence(),
                    location: imm.provider(),
                    lot: match imm.lot_number.as_ref() { Some(lot) => lot.clone(), None => "UNKNOWN".into() }
                }
            })
            .into_iter()
            .map(JsValue::from)
            .collect()
    }

    pub fn vax_status(&self) -> Option<StatusEntry> {
        if self.immunizations.is_empty() {
            return None
        }

        let mut completed = 0;
        let mut is_two_dose = false;

        for vax in self.immunizations.iter() {
            if vax.completed() {
                completed += 1;
                if vax.is_two_dose() == Some(true) {
                    is_two_dose = true;
                }
            }
        }

        let vax_color;
        let vax_status;
        let days_since = self.imm_elapsed_time().unwrap();

        if is_two_dose && completed == 2 {
            if days_since < WAITING_PERIOD {
                vax_color = "yellow";
                vax_status = "Vaccination complete, less than two weeks since last jab";
            } else {
                vax_color = "green";
                vax_status = "Vaccination complete";
            }
        } else if is_two_dose && completed != 2 {
            vax_color = "red";
            vax_status = "Vaccination incomplete, second dose missing";
        } else if is_two_dose == false && completed == 1 {
            if days_since < WAITING_PERIOD {
                vax_color = "yellow";
                vax_status = "Vaccination complete, less than two weeks since last jab";
            } else {
                vax_color = "green";
                vax_status = "Vaccination complete";
            }
        } else if is_two_dose == false && completed != 1 {
            vax_color = "red";
            vax_status = "Vaccination incomplete, no completed vaccinations found";
        } else {
            vax_color = "red";
            vax_status = "Vaccination status unknown";
        }

        Some(StatusEntry {
            mark: vax_color.into(),
            text: vax_status.into(),
        })
    }
}

#[wasm_bindgen]
pub fn main() {
    utils::set_panic_hook();
}
