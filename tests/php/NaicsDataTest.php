<?php
/**
 * Tests for the NAICS data functions.
 *
 * Verifies that the sector/subsector data is well-formed and internally consistent.
 */

declare(strict_types=1);

use PHPUnit\Framework\TestCase;

class NaicsDataTest extends TestCase {

    public function test_sectors_returns_20_entries(): void {
        $sectors = cbm_get_naics_sectors();
        $this->assertCount( 20, $sectors );
    }

    public function test_all_sector_codes_have_subsectors(): void {
        $sectors    = cbm_get_naics_sectors();
        $subsectors = cbm_get_naics_subsectors();

        foreach ( array_keys( $sectors ) as $code ) {
            $this->assertArrayHasKey(
                $code,
                $subsectors,
                "Sector code '$code' has no subsector entry."
            );
            $this->assertNotEmpty(
                $subsectors[ $code ],
                "Sector code '$code' has an empty subsector array."
            );
        }
    }

    public function test_no_orphan_subsector_keys(): void {
        $sectors    = cbm_get_naics_sectors();
        $subsectors = cbm_get_naics_subsectors();

        foreach ( array_keys( $subsectors ) as $code ) {
            $this->assertArrayHasKey(
                $code,
                $sectors,
                "Subsector group '$code' does not match any sector."
            );
        }
    }

    public function test_subsector_codes_are_strings(): void {
        $subsectors = cbm_get_naics_subsectors();

        foreach ( $subsectors as $sector_code => $subs ) {
            foreach ( $subs as $sub_code => $label ) {
                $this->assertIsString(
                    (string) $sub_code,
                    "Subsector code under sector '$sector_code' is not a string."
                );
                $this->assertNotEmpty(
                    $label,
                    "Subsector '$sub_code' under sector '$sector_code' has an empty label."
                );
            }
        }
    }

    public function test_known_sector_exists(): void {
        $sectors = cbm_get_naics_sectors();
        $this->assertArrayHasKey( '54', $sectors );
        $this->assertSame( 'Professional, Scientific, and Technical Services', $sectors['54'] );
    }

    public function test_known_subsector_belongs_to_correct_sector(): void {
        $subsectors = cbm_get_naics_subsectors();
        $this->assertArrayHasKey( '541', $subsectors['54'] );
        $this->assertSame(
            'Professional, Scientific, and Technical Services',
            $subsectors['54']['541']
        );
    }
}
