import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },

  collections: {
    puppies: collection({
      label: 'Puppies',
      slugField: 'name',
      path: 'src/content/puppies/*',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        sex: fields.select({
          label: 'Sex',
          options: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ],
          defaultValue: 'male',
        }),
        color: fields.text({ label: 'Color', description: 'e.g. "Blue merle", "Cream", "Black pied"' }),
        birthDate: fields.date({ label: 'Birth date' }),
        readyDate: fields.date({ label: 'Ready to go home' }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Available', value: 'available' },
            { label: 'Reserved', value: 'reserved' },
            { label: 'Sold', value: 'sold' },
          ],
          defaultValue: 'available',
        }),
        price: fields.number({ label: 'Price (USD)', defaultValue: 1200 }),
        gallery: fields.array(
          fields.text({ label: 'Image path', description: 'Path from /public, e.g. /images/puppies/loki/loki-1.jpg' }),
          { label: 'Gallery', itemLabel: (props) => props.fields.value.value || 'Image' }
        ),
        video: fields.text({
          label: 'Video path (optional)',
          description: 'Path from /public, e.g. /videos/loki-play.mp4',
        }),
        note: fields.text({
          label: 'Short note',
          multiline: true,
          description: 'Max 280 characters. Shown on the puppy page.',
          validation: { length: { max: 280 } },
        }),
        vetExamDate: fields.date({ label: 'Vet exam date' }),
        vaccinationDate: fields.date({ label: 'Vaccination date' }),
        dewormingDate: fields.date({ label: 'Deworming date' }),
        healthCertificateAvailable: fields.checkbox({
          label: 'Health certificate available',
          defaultValue: false,
        }),
        sire: fields.text({ label: 'Sire name (optional)' }),
        dam: fields.text({ label: 'Dam name (optional)' }),
      },
    }),

    parents: collection({
      label: 'Parents (Sires & Dams)',
      slugField: 'name',
      path: 'src/content/parents/*',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        sex: fields.select({
          label: 'Sex',
          options: [
            { label: 'Male (Sire)', value: 'male' },
            { label: 'Female (Dam)', value: 'female' },
          ],
          defaultValue: 'female',
        }),
        color: fields.text({ label: 'Color' }),
        photo: fields.text({ label: 'Photo path (optional)', description: 'Path from /public' }),
        note: fields.text({ label: 'Note (optional)', multiline: true }),
      },
    }),
  },
});
