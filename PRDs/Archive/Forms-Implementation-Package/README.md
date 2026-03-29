# CBM Forms Implementation Package

## Overview

This package contains everything needed to implement the two CBM intake forms on the WordPress website and connect them to EspoCRM.

| File | Purpose |
| --- | --- |
| `client-intake-form.json` | Gravity Forms export — Client Mentoring Request form |
| `mentor-application-form.json` | Gravity Forms export — Mentor Application form |
| `field-mapping.md` | Maps every form field to its EspoCRM entity and API field name |
| `README.md` | This file — implementation instructions |

---

## Prerequisites

Before starting, confirm the following are in place:

- [ ] WordPress site is running and accessible
- [ ] Gravity Forms plugin is installed and licensed
- [ ] Gravity Forms **Webhooks Add-On** is installed (included with Gravity Forms Elite/Pro license)
- [ ] EspoCRM is running and accessible from the WordPress server
- [ ] An EspoCRM **API User** account has been created with appropriate permissions (see EspoCRM API User Setup below)
- [ ] The API key for that user is available

---

## Step 1 — Import the Forms into Gravity Forms

1. In the WordPress admin, go to **Forms → Import/Export**
2. Select **Import Forms**
3. Upload `client-intake-form.json` — this creates the **CBM Mentoring Request** form
4. Upload `mentor-application-form.json` — this creates the **CBM Mentor Application** form
5. Note the form IDs assigned by WordPress after import — you will need them for the webhook handler

---

## Step 2 — Complete the TBD Field Values

Several fields contain placeholder values that must be updated before go-live. See the **TBD Items** table in `field-mapping.md` for the full list.

For each TBD field:
1. In Gravity Forms, open the form editor
2. Click the relevant field
3. Edit the **Choices** list to replace placeholder values with the final list
4. Save the form

Fields requiring leadership input (Mentoring Focus Areas, Languages, How Did You Hear) must be confirmed with CBM before this step.

---

## Step 3 — Set Up the Webhook Handler

The client intake form creates **three linked EspoCRM records** (Account, Contact, Engagement) in a single submission. This requires a custom webhook handler — the built-in Gravity Forms Webhooks Add-On alone cannot create multiple linked records.

The mentor application form creates **one record** (Contact) and can use the Webhooks Add-On directly, or also use the handler for consistency.

### Option A — Custom WordPress Plugin (Recommended)

Create a small WordPress plugin that:
1. Registers a REST API endpoint (e.g., `/wp-json/cbm/v1/intake`) to receive the Gravity Forms webhook payload
2. Extracts field values from the payload
3. Makes the required sequence of API calls to EspoCRM
4. Returns a 200 response on success

A sample plugin scaffold is provided below. Pass this to your developer along with `field-mapping.md`.

```php
<?php
/**
 * Plugin Name: CBM EspoCRM Integration
 * Description: Handles Gravity Forms webhook submissions and creates EspoCRM records.
 * Version: 1.0
 */

define('CBM_ESPO_BASE_URL', 'https://YOUR-ESPOCRM-URL');
define('CBM_ESPO_API_KEY',  'YOUR-API-KEY');

add_action('rest_api_init', function() {
    register_rest_route('cbm/v1', '/intake', [
        'methods'             => 'POST',
        'callback'            => 'cbm_handle_client_intake',
        'permission_callback' => '__return_true',
    ]);
    register_rest_route('cbm/v1', '/mentor', [
        'methods'             => 'POST',
        'callback'            => 'cbm_handle_mentor_application',
        'permission_callback' => '__return_true',
    ]);
});

function cbm_espo_post($endpoint, $data) {
    $response = wp_remote_post(CBM_ESPO_BASE_URL . '/api/v1/' . $endpoint, [
        'headers' => [
            'Content-Type' => 'application/json',
            'X-Api-Key'    => CBM_ESPO_API_KEY,
        ],
        'body'    => json_encode($data),
        'timeout' => 15,
    ]);
    if (is_wp_error($response)) return null;
    return json_decode(wp_remote_retrieve_body($response), true);
}

function cbm_handle_client_intake(WP_REST_Request $request) {
    $body = $request->get_json_params();
    // TODO: Extract fields using field-mapping.md GF Field IDs
    // TODO: Step 1 — POST Account
    // TODO: Step 2 — POST Contact (with accountId)
    // TODO: Step 3 — POST CEngagement (with accountId)
    return new WP_REST_Response(['status' => 'ok'], 200);
}

function cbm_handle_mentor_application(WP_REST_Request $request) {
    $body = $request->get_json_params();
    // TODO: Extract fields using field-mapping.md GF Field IDs
    // TODO: POST Contact (cContactType=Mentor, cMentorStatus=Submitted)
    return new WP_REST_Response(['status' => 'ok'], 200);
}
```

### Option B — External Middleware (e.g., Make/Zapier)

If a developer is not available, a no-code middleware platform can handle the multi-step record creation. This adds a dependency on a third-party service and ongoing subscription cost, but requires no custom code.

---

## Step 4 — Configure Gravity Forms Webhooks

Once the handler endpoint is deployed:

1. In Gravity Forms, open the **CBM Mentoring Request** form
2. Go to **Settings → Webhooks → Add New**
3. Set the **Request URL** to your handler endpoint (e.g., `https://yoursite.org/wp-json/cbm/v1/intake`)
4. Set **Request Method** to `POST`
5. Set **Request Format** to `JSON`
6. Set **Request Body** to **All Fields**
7. Save and repeat for the **CBM Mentor Application** form, pointing to `/wp-json/cbm/v1/mentor`

---

## Step 5 — EspoCRM API User Setup

Create a dedicated API user in EspoCRM for the WordPress integration:

1. Go to **Administration → API Users → Create API User**
2. Set a name such as `WordPress Integration`
3. Generate an API key and store it securely
4. Assign a Role that grants:
   - **Create** permission on Account, Contact, CEngagement
   - **Read** permission on Account (needed to retrieve the Account ID after creation)
   - No access to other entities

---

## Step 6 — Place Forms on WordPress Pages

1. In WordPress, go to the page where each form should appear
2. Use the Gravity Forms block or shortcode to embed:
   - **Get Mentoring** page → CBM Mentoring Request form (`[gravityforms id="1"]`)
   - **Volunteer / Mentor** page → CBM Mentor Application form (`[gravityforms id="2"]`)
3. Note: form IDs may differ from `1` and `2` depending on what was already in WordPress when the forms were imported — use the actual IDs assigned at import

---

## Step 7 — Test Before Go-Live

Submit a test entry for each form and verify:

**Client Intake**
- [ ] Account record created in EspoCRM with correct field values
- [ ] Contact record created and linked to the Account
- [ ] Engagement record created with Status = Submitted and linked to Account
- [ ] Admin notification email received
- [ ] Applicant confirmation email received at submitted address
- [ ] New Engagement appears in the Submitted Engagements list view in EspoCRM

**Mentor Application**
- [ ] Contact record created in EspoCRM with Contact Type = Mentor, Mentor Status = Submitted
- [ ] Terms & Conditions Accepted = true and acceptance timestamp populated
- [ ] Felony Conviction field populated correctly
- [ ] Admin notification email received
- [ ] Applicant confirmation email received at submitted address
- [ ] New Contact appears in the Submitted Mentor Applications list view in EspoCRM

---

## Security Notes

- Store the EspoCRM API key in WordPress as a constant in `wp-config.php` or use a secrets manager — never hard-code it in plugin files committed to version control
- The webhook handler endpoint should validate that requests originate from the WordPress server (check `$_SERVER['SERVER_ADDR']` or use a shared secret token)
- The `cFelonyConviction` field is marked as admin-only in EspoCRM — confirm field-level security is configured correctly before go-live

---

## Questions

Contact the CBM tech admin for:
- EspoCRM base URL and API key
- Final values for TBD dropdown fields
- EspoCRM list view configuration for the admin review queues
