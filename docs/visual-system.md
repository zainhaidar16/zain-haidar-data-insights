# Visual system

The portfolio uses Open Runde for display type and Inter for body text, preserving its established identity. Foundations live in `src/premium.css`; `src/styles.css` supplies the Tailwind bridge and shared layout rules without a competing palette.

- Type roles: display 72/60/48/36px by breakpoint, section 48/36/30px, titles24px, body16px, supporting14px, captions12px. Display text and the inset hero are documented brand exceptions to the installed skills' single-font/strict-radius defaults.
- Spacing: 0,2,4,8,12,16,24,32,40,48,64,80,96px. Section spacing96px desktop,64px tablet,48px mobile. Cards32px padding desktop/24px mobile and24px grid gaps.
- Radii: cards24px, controls12px, icons8px, badges/navigation full pills. Hero45px desktop/32px tablet/28px mobile remains an intentional signature.
- Motion: cubic-bezier(.22,1,.36,1), feedback220ms, navigation/menu500ms, hero550ms and once-only reveal600ms. Header movement uses transform animation after layout change; its width does not animate. Hero entrance has no animated blur. Menu links stagger60ms. Focus locks navigation position. Reduced motion disables movement and immediately reveals content.
- State styling: explicit pressed/selected/focus/disabled styles, inline enquiry errors, existing loading/success/error handling preserved. Public controls use visible focus rings. Form fields and primary actions are48px high; secondary hero links are at least44px.
- Colors: semantic accent/surface/text/border/control/focus tokens support both themes. Legacy purple variables exist only as compatibility aliases for unchanged admin components. Font-face descriptors intentionally use literal family names.

Writing/blog is retired: public article routes, the legacy insights route, admin Posts UI, home section, navigation and post fetches were removed. Existing Supabase records, schema and storage were not deleted. Old blog URLs return the normal404.

## Validation

Build: `npm run build`
Types: `npx tsc --noEmit`
Unit + HTTP removal tests: start production server, then set TEST_BASE_URL and run `npm test` (13 checks).
Changed TypeScript files: targeted ESLint. Full-repository lint has pre-existing formatting issues.

Browser checks cover desktop/mobile hero, real Open Runde rendering, 375/390/768/1024/1440 layouts, no horizontal overflow, search/filter/empty results, project/service details, About, dark/light switch, mobile menu/Escape/navigation, keyboard navigation position, reduced motion, contact intent switching/inline blank-submit validation, login/password visibility. A real enquiry was not submitted and authenticated admin editing was not exercised.
