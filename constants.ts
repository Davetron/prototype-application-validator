export const ANALYSIS_STAGES = [
  "Digitizing documents for analysis...",
  "Identifying site location maps [Art. 22]...",
  "Scanning newspaper notice for DLR approved publications...",
  "Verifying site notice erection date and signatures...",
  "Comparing 'Existing' vs 'Proposed' floor plans [Art. 23]...",
  "Checking scale accuracy and north points...",
  "Evaluating legal interest and owner consent...",
  "Detecting potential Article 26 invalidation grounds...",
  "Drafting final technical validation report..."
];

export const TECHNICAL_CHECKLIST = `
## Article 22 — Application Form
- Legal interest of applicant stated **[Art. 22(1)(d)]**
- Letter of consent from owner provided where applicant is not the owner **[Art. 22(1)(d)]**
- **Description of Proposed Development:** Must be clear and match all other notices. **[Art. 22]**

## Articles 17 & 19 — Site Notice
- Site notice headed “Dún Laoghaire–Rathdown County Council” **[Art. 19(1)(a)]**
- Words “Site Notice” appear under Council name **[Art. 19(1)(a)]**
- Correct colour used: White (standard) **[Art. 19(1)(b)]** or Yellow where required **[Art. 19(4)]**
- Date of erection stated and notice signed **[Art. 19(1)(a)]**
- Statement regarding inspection or purchase of application included **[Art. 19(1)(a)]**
- Statement regarding submissions/observations and statutory time limits included **[Art. 19(1)(a)]**
- Notice otherwise conforms to Form No. 1, Schedule 3 **[Art. 19(1)(a); Sch. 3, Form 1]**
- EIAR stated where submitted, including Portal Confirmation Notice **[Art. 19(1)(a)]**
- Protected Structure / Proposed Protected Structure stated where applicable **[Art. 19(1)(a)]**
- Retention explicitly stated where applicable **[Art. 19(1)(a)]**
- IPC / Waste Licence requirement stated where applicable **[Art. 19(1)(a)]**
- Establishment (Major Accident Directive) stated where applicable **[Art. 19(1)(a)]**
- Position of site notice(s) shown on site location maps **[Art. 22(2)(b)(iv)]**
- Electricity/Telecom Overhead Lines: exempt from site notice **[Art. 17(3)]**

## Articles 17 & 18 — Newspaper Notice
- Newspaper notice published in one of approved newspapers: Irish Independent, The Herald, Irish Star, Irish Sun, Irish Examiner,Sunday Independent, Sunday World, Irish Mail on Sunday,Irish Daily mail, Irish Daily Mirror, Sunday Times, Sunday Business Post, Southside People, Dublin Gazette (south Edition)Southside New, Dublin People South. **[Art. 18(2)(a)]**
- Notice headed “Dún Laoghaire–Rathdown County Council” **[Art. 18(1)]**
- Name of applicant stated **[Art. 18(1)(a)]**
- Correct site location (townland or postal address) stated **[Art. 18(1)(b)]**
- Type of permission stated (permission / retention / outline / consequent) **[Art. 18(1)(c)]**
- Brief description of nature and extent of development **[Art. 18(1)(d)(i)]**
- Protected Structure / Proposed Protected Structure stated where applicable **[Art. 18(1)(d)(iii)]**
- IPC / Waste Licence stated where applicable **[Art. 18(1)(d)(iv)]**
- Statement regarding inspection/purchase and submissions during public opening hours **[Art. 18(1)(e)]**
- Strategic Development Zone stated where applicable **[Art. 18(1)(d)(v)]**
- Application lodged within 2 weeks of publication (excluding weekends/bank holidays) **[Art. 17(1)(a)]**

## Article 26 — Validation
- Application documents comply with Articles 18, 19(1)(a), and 22 (and where relevant 24 and 25) **[Art. 26(1), 26(3)]**
- Site notice and/or newspaper notice not inadequate or misleading **[Art. 26(3)(b)]**

## Article 22 — Documents to be Submitted
- Copy of relevant newspaper page showing date and title **[Art. 22(2)(a)]**
- Copy of site notice **[Art. 22(2)(a)]**
- Site location maps at 1:1,000 or 1:2,500 **[Art. 22(2)(b)]**
  - Application site outlined in red **[Art. 22(2)(b)(i)]**
  - Adjacent land under applicant control outlined in blue **[Art. 22(2)(b)(ii)]**
  - Wayleaves coloured yellow (if applicable) **[Art. 22(2)(b)(iii)]**
  - Site notice location shown **[Art. 22(2)(b)(iv)]**
- Wastewater treatment details and evidence of suitability where not to public sewer **[Art. 22(2)(c)]**
- Part V documentation provided **[Art. 22(2)(e)]**
- Planning drawings issue sheet checked **[Art. 22(4)(a)]**

## Article 21 — Outline Permission Restrictions
- Application does not seek outline permission for protected structures **[Art. 21(b)]**
- Application does not seek outline permission for retention **[Art. 21(a)]**
- Application does not seek outline permission for IPC/Waste Licence development **[Art. 21(c)]**

## Article 23 — Plans and Drawings
- Site or layout plan at scale ≥ 1:500 **[Art. 23(1)(a)]**
- Site boundary delineated in red **[Art. 23(1)(a)]**
- Buildings, roads, boundaries, septic tanks and percolation areas bored wells, significant tree stands and other features on adjoining land or in vicinity of the subject site shown on site plan. **[Art. 23(1)(a)]**
- Other plans, including floor plans, elevations and sections drawn at a scale of not less than 1:200 (or other agreed scale) indicated thereon **[Art. 23(1)(b)]**
- **Completeness Check vs Description:** Plans and drawings must cover ALL works mentioned in the "Description of Proposed Development" (Art 22). E.g., if "attic conversion" or "loft works" are mentioned, floor plans for that specific level MUST be provided. Failure to include drawings for works described is a major invalidation ground. **[Art. 23; Art. 26(3)]**
- Site layout plan and other plans indicating contours/levels and proposed structures relative to O.S. Datum or temporary local benchmark (as appropriate). **[Art. 23(1)(c)]**
- Drawings of elevations of proposed structure showing main features of contiguous buildings on application site or in vicinity to scale not less than 1:200 **[Art. 23(1)(d)]**
- Curtilage impacts shown for Protected Structures **[Art. 23(1)(d)]**
- Proposed and existing structures clearly distinguished in each of the plan and elevation drawings. **Crucial check: Plans must not be mislabelled (e.g. two plans both titled "Existing" when one shows proposed works is a failure of clarity).** **[Art. 23(1)(e)]**
- Plans & drawings of floor plans, elevations and sections, shall indicate in figures the principal dimensions (including overall height) of any proposed structure and the site, and site or layout plans shall indicate the distances of any such structure from the boundaries of the site. **[Art. 23(1)(f)]**
- Ordnance Survey based plans & maps show relevant O.S. sheet number **[Art. 23(1)(g)]**
- North point shown on all plans & drawings (except elevations & sections) other than O.S. maps/plans **[Art. 23(1)(h)]**
- Photographs and particulars for Protected Structures / ACAs **[Art. 23(2)]**

## Environmental Assessment
- EIAR provided where required (thresholds assessed) **[Art. 93; Sch. 5]**
- Natura Impact Statement provided where required **[Art. 250]**

## Article 24 — Outline Applications
- Plans sufficient to assess siting, layout, and key parameters **[Art. 24(1)]**

## Article 25 — Electricity Infrastructure (Where Applicable)
- Correct exemptions applied for overhead electricity lines **[Art. 25(1)]**
- Plans at scale ≥ 1:100 showing support structures provided **[Art. 25(2)]**

## Large Residential Development (LRD)
- Valid LRD opinion or Section 247(7) confirmation within 6 months **[Part 2, Sch. 2A]**
- LRD Form 19 correctly completed and valid **[Sch. 19]**
`;

export const SYSTEM_BEHAVIOR = `
You are a **strict planning application validation assistant** for Dún Laoghaire–Rathdown County Council.

## Role & Tone
- Act as a technical gatekeeper. Use formal, regulatory language.
- Cite specific Articles (e.g., Art. 22(1)(d)) for every finding.
- Citations must be precise and related to the failure type.

## Output Requirements
- Provide a structured JSON response.
- Every category in the technical checklist must be addressed.
- Status must be 'COMPLIANT', 'NON_COMPLIANT', or 'WARNING'.
`;