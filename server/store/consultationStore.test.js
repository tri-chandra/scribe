import consultationStore, { Consultation, clearAll } from "./consultationStore";

describe('upsertConsultation', () => {
    describe('when inserting new record', () => {
        const newRecord = new Consultation(
            'patient name',
            'note',
            [],
            Date.now()
        );

        const insertedRecord = consultationStore.upsertConsultation(newRecord);

        test('record inserted successfully', () => {
            expect(insertedRecord).toStrictEqual(newRecord);
        });
    });

    describe('when inserting existing record', () => {
        const newRecord = new Consultation(
            'patient name',
            'note',
            [],
            Date.now()
        );
        const updateToRecord = new Consultation(
            'patient name 2',
            'note 2',
            [],
            Date.now()
        );

        consultationStore.upsertConsultation(newRecord);
        const insertedRecord = consultationStore.upsertConsultation(updateToRecord);

        test('record updated successfully', () => {
            expect(insertedRecord).toStrictEqual(updateToRecord);
        });
    });
});

describe('getConsultation', () => {
    const newRecord = new Consultation(
        'patient name',
        'note',
        [],
        Date.now()
    );

    consultationStore.upsertConsultation(newRecord);
    const fetchedRecord = consultationStore.getConsultation(newRecord.id);

    test('record fetched successfully', () => {
        expect(fetchedRecord).toStrictEqual(newRecord);
    });
});

describe('getConsultations', () => {
    clearAll();
    const records = [
        new Consultation(
            'patient name 1',
            'note',
            [],
            Date.now()
        ),
        new Consultation(
            'patient name 2',
            'note',
            [],
            Date.now()
        ),
        new Consultation(
            'patient name 3',
            'note',
            [],
            Date.now()
        )
    ];

    records.map(record => consultationStore.upsertConsultation(record));
    const fetchedRecords = consultationStore.getConsultations();

    test('records fetched successfully', () => {
        expect(fetchedRecords).toStrictEqual(records);
    });
});