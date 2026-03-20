/**
 * NAICS Cascading Dropdown — Client Mentoring Request Form.
 *
 * Filters the NAICS Subsector dropdown based on the selected NAICS Sector.
 * Data is provided via wp_localize_script() as window.cbmNaicsData.
 *
 * Expected cbmNaicsData structure:
 * {
 *   sectors: {
 *     "11": { label: "Agriculture...", subsectors: { "111": "Crop Production", ... } },
 *     ...
 *   },
 *   sectorFieldId: 11,
 *   subsectorFieldId: 12,
 *   formId: 1
 * }
 */
(function ($) {
    'use strict';

    if (typeof cbmNaicsData === 'undefined') {
        return;
    }

    var config = cbmNaicsData;

    /**
     * Build the Gravity Forms input selector for a given field ID and form ID.
     * GF uses #input_{formId}_{fieldId} for standard dropdowns.
     */
    function getFieldSelector(fieldId) {
        return '#input_' + config.formId + '_' + fieldId;
    }

    var $sector = $(getFieldSelector(config.sectorFieldId));
    var $subsector = $(getFieldSelector(config.subsectorFieldId));

    if (!$sector.length || !$subsector.length) {
        return;
    }

    var placeholder = 'Select a Sector first';

    /**
     * Reset the subsector dropdown to placeholder state.
     */
    function resetSubsector() {
        $subsector.empty();
        $subsector.append(
            $('<option>', { value: '', text: placeholder, disabled: true, selected: true })
        );
        $subsector.prop('disabled', true);
    }

    /**
     * Populate the subsector dropdown with options for the selected sector.
     */
    function populateSubsectors(sectorCode) {
        $subsector.empty();

        if (!sectorCode || !config.sectors[sectorCode]) {
            resetSubsector();
            return;
        }

        var subsectors = config.sectors[sectorCode].subsectors;
        var hasOptions = false;

        $subsector.append(
            $('<option>', { value: '', text: 'Select a Subsector', disabled: true, selected: true })
        );

        $.each(subsectors, function (code, label) {
            $subsector.append($('<option>', { value: code, text: label }));
            hasOptions = true;
        });

        $subsector.prop('disabled', !hasOptions);
    }

    // Initialize: set subsector to placeholder.
    resetSubsector();

    // If sector already has a value (e.g., page refresh with cached form data),
    // populate subsectors immediately.
    var initialSector = $sector.val();
    if (initialSector) {
        populateSubsectors(initialSector);
    }

    // On sector change, filter subsectors.
    $sector.on('change', function () {
        populateSubsectors($(this).val());
    });

    // Re-initialize after Gravity Forms AJAX form render.
    $(document).on('gform_post_render', function (event, formId) {
        if (parseInt(formId, 10) !== parseInt(config.formId, 10)) {
            return;
        }

        $sector = $(getFieldSelector(config.sectorFieldId));
        $subsector = $(getFieldSelector(config.subsectorFieldId));

        resetSubsector();

        $sector.on('change', function () {
            populateSubsectors($(this).val());
        });
    });

})(jQuery);
