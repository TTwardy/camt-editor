// Auto-generated CAMT.053.001.02 schema
// Filtered: only elements that are used for at least one payment type
// Usage codes: R=Required, BD=Bank Dependent, C=Conditional, XOR=Choice, NU=Not Used

export const PAYMENT_TYPES = [
  { id: "sepa", label: "SEPA" },
  { id: "ach", label: "ACH Domestic & Intl" },
  { id: "wire", label: "Wire Domestic & Intl" },
  { id: "cheques", label: "Cheques / Drafts" },
];

export const CAMT_SCHEMA = [
  {
    tag: "GrpHdr",
    label: "GroupHeader",
    mult: "1..1",
    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
    children: [
      {
        tag: "MsgId",
        label: "MessageIdentification",
        type: "Text",
        mult: "1..1",
        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
      },
      {
        tag: "CreDtTm",
        label: "CreationDateTime",
        type: "DateTime",
        mult: "1..1",
        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
        rules: "Date and time at which the message was created. Recommendation that this be expressed using UTC designator [Z], rather than local, with or without offset.",
      },
      {
        tag: "MsgRcpt",
        label: "MessageRecipient",
        type: "+",
        mult: "0..1",
        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
        children: [
          {
            tag: "Nm",
            label: "Name",
            type: "Text",
            mult: "0..1",
            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
          },
          {
            tag: "Id",
            label: "Identification",
            mult: "0..1",
            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
            children: [
              {
                tag: "OrgId",
                label: "OrganisationIdentification",
                mult: "1..1",
                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                orField: "{Or",
                children: [
                  {
                    tag: "BICOrBEI",
                    label: "BICOrBEI",
                    type: "Identifier",
                    mult: "0..1",
                    usage: { ach: "C", wire: "C", cheques: "C", sepa: "C" },
                    rules: "Identifies the BIC of the Message Recipient, if available",
                  },
                  {
                    tag: "Othr",
                    label: "Other",
                    mult: "0..n",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                    rules: "Other type of bank specific id for the customer",
                    children: [
                      {
                        tag: "Id",
                        label: "Identification",
                        type: "Text",
                        mult: "1..1",
                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                      },
                      {
                        tag: "SchmeNm",
                        label: "SchemeName",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        children: [
                          {
                            tag: "Cd",
                            label: "Code",
                            type: "Code",
                            mult: "1..1",
                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                            orField: "{{Or",
                          },
                          {
                            tag: "Prtry",
                            label: "Proprietary",
                            type: "Text",
                            mult: "1..1",
                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                            orField: "Or}}",
                          },
                        ]
                      },
                      {
                        tag: "Issr",
                        label: "Issuer",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                    ]
                  },
                ]
              },
            ]
          },
          {
            tag: "CtctDtls",
            label: "ContactDetails",
            mult: "0..1",
            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
            children: [
              {
                tag: "Nm",
                label: "Name",
                type: "Text",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
              },
            ]
          },
        ]
      },
      {
        tag: "MsgPgntn",
        label: "MessagePagination",
        type: "+",
        mult: "0..1",
        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
        rules: "When message pagination is used, the message must contain only one report / statement / notification. Please, see separate XML-sample for rule validation. There is no recommended solution proposed for",
        children: [
          {
            tag: "PgNb",
            label: "PageNumber",
            type: "Text",
            mult: "1..1",
            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
          },
          {
            tag: "LastPgInd",
            label: "LastPageIndicator",
            type: "Indicator",
            mult: "1..1",
            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
          },
        ]
      },
      {
        tag: "AddtlInf",
        label: "AdditionalInformation",
        type: "Text",
        mult: "0..1",
        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
        rules: "Camt053 is used for end of cycle statement reporting. This may be used to indicate cycle type.  Where this is used, all statements within this message are of the same type.  Codes are (not exhaustive ",
      },
    ]
  },
  {
    tag: "Stmt",
    label: "Statement",
    mult: "1..n",
    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
    children: [
      {
        tag: "Id",
        label: "Identification",
        type: "Text",
        mult: "1..1",
        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
        rules: "Unique per statement and account",
      },
      {
        tag: "ElctrncSeqNb",
        label: "ElectronicSequenceNumber",
        type: "Quantity",
        mult: "0..1",
        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
        rules: "Sequential number of the report, assigned by the account servicer. It is increased incrementally  by 1 for each report sent electronically.  Note: it is recommended that it is not reset less than a pe",
      },
      {
        tag: "LglSeqNb",
        label: "LegalSequenceNumber",
        type: "Quantity",
        mult: "0..1",
        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
        rules: "Legal sequential number of the report, assigned by the account servicer. It is recommended to be increased incrementally by 1 for each report sent.",
      },
      {
        tag: "CreDtTm",
        label: "CreationDateTime",
        type: "DateTime",
        mult: "1..1",
        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
        rules: "Date and time at which the report was created. Recommendation that this be expressed using UTC designator [Z], rather than local, with or without offset.",
      },
      {
        tag: "FrToDt",
        label: "FromToDate",
        type: "+",
        mult: "0..1",
        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
        rules: "Range of time between the start date and the end date for which the account report is issued. Recommendation that this be expressed using UTC designator [Z], rather than local, with or without offset.",
        children: [
          {
            tag: "FrDtTm",
            label: "FromDateTime",
            type: "DateTime",
            mult: "1..1",
            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
          },
          {
            tag: "ToDtTm",
            label: "ToDateTime",
            type: "DateTime",
            mult: "1..1",
            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
          },
        ]
      },
      {
        tag: "CpyDplctInd",
        label: "CopyDuplicateIndicator",
        type: "Code",
        mult: "0..1",
        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
        rules: "If Applicable, for Copy or Duplicate,  the electronic sequence  and legal sequence must be the same as the original statement.",
      },
      {
        tag: "RptgSrc",
        label: "ReportingSource",
        mult: "0..1",
        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
        children: [
          {
            tag: "Cd",
            label: "Code",
            type: "Code",
            mult: "1..1",
            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
            orField: "{Or",
          },
          {
            tag: "Prtry",
            label: "Proprietary",
            type: "Text",
            mult: "1..1",
            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
            orField: "Or}",
          },
        ]
      },
      {
        tag: "Acct",
        label: "Account",
        type: "+",
        mult: "1..1",
        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
        children: [
          {
            tag: "Id",
            label: "Identification",
            mult: "1..1",
            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
            rules: "Either <IBAN> or <Othr> must be populated",
            children: [
              {
                tag: "IBAN",
                label: "IBAN",
                type: "Identifier",
                mult: "1..1",
                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                orField: "{Or",
              },
              {
                tag: "Othr",
                label: "Other",
                mult: "1..1",
                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                orField: "Or}",
                children: [
                  {
                    tag: "Id",
                    label: "Identification",
                    type: "Text",
                    mult: "1..1",
                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                  },
                  {
                    tag: "SchmeNm",
                    label: "SchemeName",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                    children: [
                      {
                        tag: "Cd",
                        label: "Code",
                        type: "Code",
                        mult: "1..1",
                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                        orField: "{{Or",
                      },
                      {
                        tag: "Prtry",
                        label: "Proprietary",
                        type: "Text",
                        mult: "1..1",
                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                        orField: "Or}}",
                      },
                    ]
                  },
                  {
                    tag: "Issr",
                    label: "Issuer",
                    type: "Text",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                ]
              },
            ]
          },
          {
            tag: "Tp",
            label: "Type",
            mult: "0..1",
            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
            children: [
              {
                tag: "Cd",
                label: "Code",
                type: "Code",
                mult: "1..1",
                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                orField: "{Or",
              },
              {
                tag: "Prtry",
                label: "Proprietary",
                type: "Text",
                mult: "1..1",
                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                orField: "Or}",
              },
            ]
          },
          {
            tag: "Ccy",
            label: "Currency",
            type: "Code",
            mult: "0..1",
            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
          },
          {
            tag: "Nm",
            label: "Name",
            type: "Text",
            mult: "0..1",
            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
          },
          {
            tag: "Ownr",
            label: "Owner",
            mult: "0..1",
            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
            children: [
              {
                tag: "Nm",
                label: "Name",
                type: "Text",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
              },
              {
                tag: "PstlAdr",
                label: "PostalAddress",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                children: [
                  {
                    tag: "AdrTp",
                    label: "AddressType",
                    type: "Code",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                  {
                    tag: "Dept",
                    label: "Department",
                    type: "Text",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                  {
                    tag: "SubDept",
                    label: "SubDepartment",
                    type: "Text",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                  {
                    tag: "StrtNm",
                    label: "StreetName",
                    type: "Text",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                  {
                    tag: "BldgNb",
                    label: "BuildingNumber",
                    type: "Text",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                  {
                    tag: "PstCd",
                    label: "PostCode",
                    type: "Text",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                  {
                    tag: "TwnNm",
                    label: "TownName",
                    type: "Text",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                  {
                    tag: "CtrySubDvsn",
                    label: "CountrySubDivision",
                    type: "Text",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                  {
                    tag: "Ctry",
                    label: "Country",
                    type: "Code",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                  {
                    tag: "AdrLine",
                    label: "AddressLine",
                    type: "Text",
                    mult: "0..7",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                ]
              },
              {
                tag: "Id",
                label: "Identification",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                children: [
                  {
                    tag: "OrgId",
                    label: "OrganisationIdentification",
                    mult: "1..1",
                    usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                    orField: "{Or",
                    children: [
                      {
                        tag: "BICOrBEI",
                        label: "BICOrBEI",
                        type: "Identifier",
                        mult: "0..1",
                        usage: { ach: "C", wire: "C", cheques: "C", sepa: "C" },
                        rules: "Identifies the BIC of the account owner, if available",
                      },
                      {
                        tag: "Othr",
                        label: "Other",
                        mult: "0..n",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        rules: "Other type of bank specific id for the customer",
                        children: [
                          {
                            tag: "Id",
                            label: "Identification",
                            type: "Text",
                            mult: "1..1",
                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                          },
                          {
                            tag: "SchmeNm",
                            label: "SchemeName",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "Cd",
                                label: "Code",
                                type: "Code",
                                mult: "1..1",
                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                orField: "{{Or",
                              },
                              {
                                tag: "Prtry",
                                label: "Proprietary",
                                type: "Text",
                                mult: "1..1",
                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                orField: "Or}}",
                              },
                            ]
                          },
                          {
                            tag: "Issr",
                            label: "Issuer",
                            type: "Text",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            rules: "Additional information  to describe the return transaction",
                          },
                        ]
                      },
                    ]
                  },
                ]
              },
              {
                tag: "CtctDtls",
                label: "ContactDetails",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                children: [
                  {
                    tag: "NmPrfx",
                    label: "NamePrefix",
                    type: "Code",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                  {
                    tag: "Nm",
                    label: "Name",
                    type: "Text",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                  {
                    tag: "PhneNb",
                    label: "PhoneNumber",
                    type: "Text",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                  {
                    tag: "MobNb",
                    label: "MobileNumber",
                    type: "Text",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                  {
                    tag: "FaxNb",
                    label: "FaxNumber",
                    type: "Text",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                  {
                    tag: "EmailAdr",
                    label: "EmailAddress",
                    type: "Text",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                  {
                    tag: "Othr",
                    label: "Other",
                    type: "Text",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                ]
              },
            ]
          },
          {
            tag: "Svcr",
            label: "Servicer",
            mult: "0..1",
            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
            rules: "Provide at minimum at least BIC, Clearing System Member Id or Other Id in this priority order.",
            children: [
              {
                tag: "FinInstnId",
                label: "FinancialInstitutionIdentification",
                mult: "1..1",
                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                children: [
                  {
                    tag: "BIC",
                    label: "BIC",
                    type: "Identifier",
                    mult: "0..1",
                    usage: { ach: "C", wire: "C", cheques: "C", sepa: "C" },
                  },
                  {
                    tag: "ClrSysMmbId",
                    label: "ClearingSystemMemberIdentification",
                    mult: "0..1",
                    usage: { ach: "C", wire: "C", cheques: "C", sepa: "C" },
                    children: [
                      {
                        tag: "ClrSysId",
                        label: "ClearingSystemIdentification",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        children: [
                          {
                            tag: "Cd",
                            label: "Code",
                            type: "Code",
                            mult: "1..1",
                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                            orField: "{Or",
                          },
                          {
                            tag: "Prtry",
                            label: "Proprietary",
                            type: "Text",
                            mult: "1..1",
                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                            orField: "Or}",
                          },
                        ]
                      },
                      {
                        tag: "MmbId",
                        label: "MemberIdentification",
                        type: "Text",
                        mult: "1..1",
                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                      },
                    ]
                  },
                  {
                    tag: "Nm",
                    label: "Name",
                    type: "Text",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                  {
                    tag: "PstlAdr",
                    label: "PostalAddress",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                    children: [
                      {
                        tag: "AdrTp",
                        label: "AddressType",
                        type: "Code",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "Dept",
                        label: "Department",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "SubDept",
                        label: "SubDepartment",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "StrtNm",
                        label: "StreetName",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "BldgNb",
                        label: "BuildingNumber",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "PstCd",
                        label: "PostCode",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "TwnNm",
                        label: "TownName",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "CtrySubDvsn",
                        label: "CountrySubDivision",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "Ctry",
                        label: "Country",
                        type: "Code",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "AdrLine",
                        label: "AddressLine",
                        type: "Text",
                        mult: "0..7",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                    ]
                  },
                  {
                    tag: "Othr",
                    label: "Other",
                    mult: "0..1",
                    usage: { ach: "C", wire: "C", cheques: "C", sepa: "C" },
                    children: [
                      {
                        tag: "Id",
                        label: "Identification",
                        type: "Text",
                        mult: "1..1",
                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                      },
                      {
                        tag: "SchmeNm",
                        label: "SchemeName",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        children: [
                          {
                            tag: "Cd",
                            label: "Code",
                            type: "Code",
                            mult: "1..1",
                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                            orField: "{Or",
                          },
                          {
                            tag: "Prtry",
                            label: "Proprietary",
                            type: "Text",
                            mult: "1..1",
                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                            orField: "Or}",
                          },
                        ]
                      },
                      {
                        tag: "Issr",
                        label: "Issuer",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                    ]
                  },
                ]
              },
              {
                tag: "BrnchId",
                label: "BranchIdentification",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                children: [
                  {
                    tag: "Id",
                    label: "Identification",
                    type: "Text",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                  {
                    tag: "Nm",
                    label: "Name",
                    type: "Text",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                  {
                    tag: "PstlAdr",
                    label: "PostalAddress",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                    children: [
                      {
                        tag: "AdrTp",
                        label: "AddressType",
                        type: "Code",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "Dept",
                        label: "Department",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "SubDept",
                        label: "SubDepartment",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "StrtNm",
                        label: "StreetName",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "BldgNb",
                        label: "BuildingNumber",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "PstCd",
                        label: "PostCode",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "TwnNm",
                        label: "TownName",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "CtrySubDvsn",
                        label: "CountrySubDivision",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "Ctry",
                        label: "Country",
                        type: "Code",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "AdrLine",
                        label: "AddressLine",
                        type: "Text",
                        mult: "0..7",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                    ]
                  },
                ]
              },
            ]
          },
        ]
      },
      {
        tag: "RltdAcct",
        label: "RelatedAccount",
        type: "+",
        mult: "0..1",
        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
        children: [
          {
            tag: "Id",
            label: "Identification",
            mult: "1..1",
            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
            children: [
              {
                tag: "IBAN",
                label: "IBAN",
                type: "Identifier",
                mult: "1..1",
                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                orField: "{Or",
              },
              {
                tag: "Othr",
                label: "Other",
                mult: "1..1",
                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                orField: "Or}",
                children: [
                  {
                    tag: "Id",
                    label: "Identification",
                    type: "Text",
                    mult: "1..1",
                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                  },
                  {
                    tag: "SchmeNm",
                    label: "SchemeName",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                    children: [
                      {
                        tag: "Cd",
                        label: "Code",
                        type: "Code",
                        mult: "1..1",
                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                        orField: "{{Or",
                      },
                      {
                        tag: "Prtry",
                        label: "Proprietary",
                        type: "Text",
                        mult: "1..1",
                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                        orField: "Or}}",
                      },
                    ]
                  },
                  {
                    tag: "Issr",
                    label: "Issuer",
                    type: "Text",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                ]
              },
            ]
          },
          {
            tag: "Tp",
            label: "Type",
            mult: "0..1",
            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
            children: [
              {
                tag: "Cd",
                label: "Code",
                type: "Code",
                mult: "1..1",
                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                orField: "{Or",
              },
              {
                tag: "Prtry",
                label: "Proprietary",
                type: "Text",
                mult: "1..1",
                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                orField: "Or}",
              },
            ]
          },
          {
            tag: "Ccy",
            label: "Currency",
            type: "Code",
            mult: "0..1",
            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
            rules: "Currency of the Related Account",
          },
          {
            tag: "Nm",
            label: "Name",
            type: "Text",
            mult: "0..1",
            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
          },
        ]
      },
      {
        tag: "Intrst",
        label: "Interest",
        mult: "0..n",
        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
        children: [
          {
            tag: "Tp",
            label: "Type",
            mult: "0..1",
            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
            children: [
              {
                tag: "Cd",
                label: "Code",
                type: "Code",
                mult: "1..1",
                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                orField: "{Or",
              },
              {
                tag: "Prtry",
                label: "Proprietary",
                type: "Text",
                mult: "1..1",
                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                orField: "Or}",
              },
            ]
          },
          {
            tag: "Rate",
            label: "Rate",
            mult: "0..n",
            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
            children: [
              {
                tag: "Tp",
                label: "Type",
                mult: "1..1",
                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                children: [
                  {
                    tag: "Pctg",
                    label: "Percentage",
                    type: "Rate",
                    mult: "1..1",
                    usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                    orField: "{Or",
                  },
                  {
                    tag: "Othr",
                    label: "Other",
                    type: "Text",
                    mult: "1..1",
                    usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                    orField: "Or}",
                  },
                ]
              },
              {
                tag: "VldtyRg",
                label: "ValidityRange",
                type: "+",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                children: [
                  {
                    tag: "Amt",
                    label: "Amount",
                    mult: "1..1",
                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                    children: [
                      {
                        tag: "FrAmt",
                        label: "FromAmount",
                        mult: "1..1",
                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                        orField: "{Or",
                        children: [
                          {
                            tag: "BdryAmt",
                            label: "BoundaryAmount",
                            type: "Amount",
                            mult: "1..1",
                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                          },
                          {
                            tag: "Incl",
                            label: "Included",
                            type: "Indicator",
                            mult: "1..1",
                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                          },
                        ]
                      },
                      {
                        tag: "ToAmt",
                        label: "ToAmount",
                        mult: "1..1",
                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                        orField: "Or",
                        children: [
                          {
                            tag: "BdryAmt",
                            label: "BoundaryAmount",
                            type: "Amount",
                            mult: "1..1",
                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                          },
                          {
                            tag: "Incl",
                            label: "Included",
                            type: "Indicator",
                            mult: "1..1",
                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                          },
                        ]
                      },
                      {
                        tag: "FrToAmt",
                        label: "FromToAmount",
                        mult: "1..1",
                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                        orField: "Or",
                        children: [
                          {
                            tag: "FrAmt",
                            label: "FromAmount",
                            mult: "1..1",
                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                            children: [
                              {
                                tag: "BdryAmt",
                                label: "BoundaryAmount",
                                type: "Amount",
                                mult: "1..1",
                                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                              },
                              {
                                tag: "Incl",
                                label: "Included",
                                type: "Indicator",
                                mult: "1..1",
                                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                              },
                            ]
                          },
                          {
                            tag: "ToAmt",
                            label: "ToAmount",
                            mult: "1..1",
                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                            children: [
                              {
                                tag: "BdryAmt",
                                label: "BoundaryAmount",
                                type: "Amount",
                                mult: "1..1",
                                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                              },
                              {
                                tag: "Incl",
                                label: "Included",
                                type: "Indicator",
                                mult: "1..1",
                                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                              },
                            ]
                          },
                        ]
                      },
                      {
                        tag: "EQAmt",
                        label: "EqualAmount",
                        type: "Amount",
                        mult: "1..1",
                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                        orField: "Or",
                      },
                      {
                        tag: "NEQAmt",
                        label: "NotEqualAmount",
                        type: "Amount",
                        mult: "1..1",
                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                        orField: "Or}",
                      },
                    ]
                  },
                  {
                    tag: "CdtDbtInd",
                    label: "CreditDebitIndicator",
                    type: "Code",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                  {
                    tag: "Ccy",
                    label: "Currency",
                    type: "Code",
                    mult: "1..1",
                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                  },
                ]
              },
            ]
          },
          {
            tag: "FrToDt",
            label: "FromToDate",
            type: "+",
            mult: "0..1",
            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
            children: [
              {
                tag: "FrDtTm",
                label: "FromDateTime",
                type: "DateTime",
                mult: "1..1",
                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
              },
              {
                tag: "ToDtTm",
                label: "ToDateTime",
                type: "DateTime",
                mult: "1..1",
                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
              },
            ]
          },
          {
            tag: "Rsn",
            label: "Reason",
            type: "Text",
            mult: "0..1",
            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
          },
        ]
      },
      {
        tag: "Bal",
        label: "Balance",
        mult: "1..n",
        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
        children: [
          {
            tag: "Tp",
            label: "Type",
            mult: "1..1",
            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
            children: [
              {
                tag: "CdOrPrtry",
                label: "CodeOrProprietary",
                mult: "1..1",
                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                children: [
                  {
                    tag: "Cd",
                    label: "Code",
                    type: "Code",
                    mult: "1..1",
                    usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                    orField: "{Or",
                    rules: "Required balance types: OPBD = OpeningBooked with date on which the opening balance was determined CLBD = ClosingBooked  Required balance sub type in paginated statement message: INTM = Intermediate U",
                  },
                  {
                    tag: "Prtry",
                    label: "Proprietary",
                    type: "Text",
                    mult: "1..1",
                    usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                    orField: "Or}",
                  },
                ]
              },
              {
                tag: "SubTp",
                label: "SubType",
                mult: "0..1",
                usage: { ach: "C", wire: "C", cheques: "C", sepa: "C" },
                children: [
                  {
                    tag: "Cd",
                    label: "Code",
                    type: "Code",
                    mult: "1..1",
                    usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                    orField: "{Or",
                    rules: "INTM = Intermediate For paginated messages INTM is to be used together with OPBD and CLBD balance type codes to indicate intermediate characteristic of the balance. Other type codes usage is BD.",
                  },
                  {
                    tag: "Prtry",
                    label: "Proprietary",
                    type: "Text",
                    mult: "1..1",
                    usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                    orField: "Or}",
                  },
                ]
              },
            ]
          },
          {
            tag: "CdtLine",
            label: "CreditLine",
            mult: "0..1",
            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
            children: [
              {
                tag: "Incl",
                label: "Included",
                type: "Indicator",
                mult: "1..1",
                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
              },
              {
                tag: "Amt",
                label: "Amount",
                type: "Amount",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                hasCcyAttr: true,
              },
            ]
          },
          {
            tag: "Amt",
            label: "Amount",
            type: "Amount",
            mult: "1..1",
            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
            hasCcyAttr: true,
          },
          {
            tag: "CdtDbtInd",
            label: "CreditDebitIndicator",
            type: "Code",
            mult: "1..1",
            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
          },
          {
            tag: "Dt",
            label: "Date",
            type: "+",
            mult: "1..1",
            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
            children: [
              {
                tag: "Dt",
                label: "Date",
                type: "DateTime",
                mult: "1..1",
                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                orField: "{Or",
              },
            ]
          },
          {
            tag: "Avlbty",
            label: "Availability",
            mult: "0..n",
            usage: { ach: "C", wire: "C", cheques: "C", sepa: "C" },
            rules: "Conditional depending on balance type e.g.: Forward Available",
            children: [
              {
                tag: "Dt",
                label: "Date",
                mult: "1..1",
                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                rules: "Recommendation is to use Actual Date. Note BAI only uses number of days as US market practice.",
                children: [
                  {
                    tag: "NbOfDays",
                    label: "NumberOfDays",
                    type: "Text",
                    mult: "1..1",
                    usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                    orField: "{Or",
                  },
                  {
                    tag: "ActlDt",
                    label: "ActualDate",
                    type: "DateTime",
                    mult: "1..1",
                    usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                    orField: "Or}",
                  },
                ]
              },
              {
                tag: "Amt",
                label: "Amount",
                type: "Amount",
                mult: "1..1",
                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                hasCcyAttr: true,
              },
              {
                tag: "CdtDbtInd",
                label: "CreditDebitIndicator",
                type: "Code",
                mult: "1..1",
                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
              },
            ]
          },
        ]
      },
      {
        tag: "TxsSummry",
        label: "TransactionsSummary",
        mult: "0..1",
        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
        rules: "If used,  Total Credit and/or Total Debit should, at a minimum, be provided if summary data is available. Recommendation: when pagination is used Transactions Summary need only be noted in first page",
        children: [
          {
            tag: "TtlNtries",
            label: "TotalEntries",
            mult: "0..1",
            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
            children: [
              {
                tag: "NbOfNtries",
                label: "NumberOfEntries",
                type: "Text",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
              },
              {
                tag: "Sum",
                label: "Sum",
                type: "Quantity",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
              },
              {
                tag: "TtlNetNtryAmt",
                label: "TotalNetEntryAmount",
                type: "Quantity",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
              },
              {
                tag: "CdtDbtInd",
                label: "CreditDebitIndicator",
                type: "Code",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
              },
            ]
          },
          {
            tag: "TtlCdtNtries",
            label: "TotalCreditEntries",
            mult: "0..1",
            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
            children: [
              {
                tag: "NbOfNtries",
                label: "NumberOfEntries",
                type: "Text",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                rules: "Either Number of Entries or Sum or both of them should be reported",
              },
              {
                tag: "Sum",
                label: "Sum",
                type: "Quantity",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                rules: "Either Number of Entries or Sum or both of them should be reported",
              },
            ]
          },
          {
            tag: "TtlDbtNtries",
            label: "TotalDebitEntries",
            mult: "0..1",
            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
            children: [
              {
                tag: "NbOfNtries",
                label: "NumberOfEntries",
                type: "Text",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                rules: "Either Number of Entries or Sum or both of them should be reported",
              },
              {
                tag: "Sum",
                label: "Sum",
                type: "Quantity",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                rules: "Either Number of Entries or Sum or both of them should be reported",
              },
            ]
          },
          {
            tag: "TtlNtriesPerBkTxCd",
            label: "TotalEntriesPerBankTransactionCode",
            mult: "0..n",
            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
            children: [
              {
                tag: "NbOfNtries",
                label: "NumberOfEntries",
                type: "Text",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
              },
              {
                tag: "Sum",
                label: "Sum",
                type: "Quantity",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
              },
              {
                tag: "TtlNetNtryAmt",
                label: "TotalNetEntryAmount",
                type: "Quantity",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
              },
              {
                tag: "CdtDbtInd",
                label: "CreditDebitIndicator",
                type: "Code",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
              },
              {
                tag: "FcstInd",
                label: "ForecastIndicator",
                type: "Indicator",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
              },
              {
                tag: "BkTxCd",
                label: "BankTransactionCode",
                mult: "1..1",
                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                rules: "Domain and/or proprietary may be provided. At least one must be provided, if used.",
                children: [
                  {
                    tag: "Domn",
                    label: "Domain",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                    children: [
                      {
                        tag: "Cd",
                        label: "Code",
                        type: "Code",
                        mult: "1..1",
                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                      },
                      {
                        tag: "Fmly",
                        label: "Family",
                        mult: "1..1",
                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                        children: [
                          {
                            tag: "Cd",
                            label: "Code",
                            type: "Code",
                            mult: "1..1",
                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                          },
                          {
                            tag: "SubFmlyCd",
                            label: "SubFamilyCode",
                            type: "Code",
                            mult: "1..1",
                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                          },
                        ]
                      },
                    ]
                  },
                  {
                    tag: "Prtry",
                    label: "Proprietary",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                    children: [
                      {
                        tag: "Cd",
                        label: "Code",
                        type: "Text",
                        mult: "1..1",
                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                      },
                      {
                        tag: "Issr",
                        label: "Issuer",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                      },
                    ]
                  },
                ]
              },
              {
                tag: "Avlbty",
                label: "Availability",
                mult: "0..n",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                rules: "Recommendation is to use Actual Date. Note BAI only uses number of days as US market practice.",
                children: [
                  {
                    tag: "Dt",
                    label: "Date",
                    mult: "1..1",
                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                    children: [
                      {
                        tag: "NbOfDays",
                        label: "NumberOfDays",
                        type: "Text",
                        mult: "1..1",
                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                        orField: "{Or",
                      },
                      {
                        tag: "ActlDt",
                        label: "ActualDate",
                        type: "DateTime",
                        mult: "1..1",
                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                        orField: "Or}",
                      },
                    ]
                  },
                  {
                    tag: "Amt",
                    label: "Amount",
                    type: "Amount",
                    mult: "1..1",
                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                    hasCcyAttr: true,
                  },
                  {
                    tag: "CdtDbtInd",
                    label: "CreditDebitIndicator",
                    type: "Code",
                    mult: "1..1",
                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                  },
                ]
              },
            ]
          },
        ]
      },
      {
        tag: "Ntry",
        label: "Entry",
        mult: "0..n",
        usage: { ach: "C", wire: "C", cheques: "C", sepa: "C" },
        rules: "Can be absent if no movement for the account. For reporting single transaction or batch or collection of batches",
        children: [
          {
            tag: "NtryRef",
            label: "EntryReference",
            type: "Text",
            mult: "0..1",
            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
            rules: "Unique per transaction within one statement",
          },
          {
            tag: "Amt",
            label: "Amount",
            type: "Amount",
            mult: "1..1",
            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
            hasCcyAttr: true,
            rules: "Amount in the currency of the account reported. Note: This amount can be Zero.",
          },
          {
            tag: "CdtDbtInd",
            label: "CreditDebitIndicator",
            type: "Code",
            mult: "1..1",
            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
            rules: "Recommendation: treat as credit for Zero amount, unless the coding scheme treats it otherwise e.g. BAI may also designate it as a debit.",
          },
          {
            tag: "RvslInd",
            label: "ReversalIndicator",
            type: "Indicator",
            mult: "0..1",
            usage: { ach: "C", wire: "C", cheques: "C", sepa: "C" },
            rules: "Value is TRUE or FALSE. Should only be shown if TRUE.   The ReversalIndicator should be used in the reporting of Credit Transfer or Direct Debit Type-R transactions, and when used the creditor and deb",
          },
          {
            tag: "Sts",
            label: "Status",
            type: "Code",
            mult: "1..1",
            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
            rules: "Booked for End of Cycle statement: BOOK = Booked is required.  Not used INFO = Information PDNG = Pending",
          },
          {
            tag: "BookgDt",
            label: "BookingDate",
            type: "+",
            mult: "0..1",
            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
            children: [
              {
                tag: "Dt",
                label: "Date",
                type: "DateTime",
                mult: "1..1",
                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                orField: "{Or",
                rules: "Only Use Date.",
              },
            ]
          },
          {
            tag: "ValDt",
            label: "ValueDate",
            type: "+",
            mult: "0..1",
            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
            children: [
              {
                tag: "Dt",
                label: "Date",
                type: "DateTime",
                mult: "1..1",
                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                orField: "{Or",
                rules: "Only Use Date.",
              },
            ]
          },
          {
            tag: "AcctSvcrRef",
            label: "AccountServicerReference",
            type: "Text",
            mult: "0..1",
            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
            rules: "Recommendation: When the same booked entry is reported in both the camt.052 or camt.054,  the Account Service reference should be the same as reported in camt.053.",
          },
          {
            tag: "Avlbty",
            label: "Availability",
            mult: "0..n",
            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
            rules: "General practice in US  is to use number of days.  Market practice dependant. Actual Date is preferred for bank to provide. Note BAI only uses number of days.  Recommendation is to use Actual Date",
            children: [
              {
                tag: "Dt",
                label: "Date",
                mult: "1..1",
                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                children: [
                  {
                    tag: "NbOfDays",
                    label: "NumberOfDays",
                    type: "Text",
                    mult: "1..1",
                    usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                    orField: "{Or",
                  },
                  {
                    tag: "ActlDt",
                    label: "ActualDate",
                    type: "DateTime",
                    mult: "1..1",
                    usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                    orField: "Or}",
                  },
                ]
              },
              {
                tag: "Amt",
                label: "Amount",
                type: "Amount",
                mult: "1..1",
                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                hasCcyAttr: true,
              },
              {
                tag: "CdtDbtInd",
                label: "CreditDebitIndicator",
                type: "Code",
                mult: "1..1",
                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
              },
            ]
          },
          {
            tag: "BkTxCd",
            label: "BankTransactionCode",
            mult: "1..1",
            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
            rules: "Domain and/or proprietary may be provided. At least one must be provided.",
            children: [
              {
                tag: "Domn",
                label: "Domain",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                rules: "Recommendation suggested that standard BTC are used as first priority",
                children: [
                  {
                    tag: "Cd",
                    label: "Code",
                    type: "Code",
                    mult: "1..1",
                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                  },
                  {
                    tag: "Fmly",
                    label: "Family",
                    mult: "1..1",
                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                    children: [
                      {
                        tag: "Cd",
                        label: "Code",
                        type: "Code",
                        mult: "1..1",
                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                      },
                      {
                        tag: "SubFmlyCd",
                        label: "SubFamilyCode",
                        type: "Code",
                        mult: "1..1",
                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                      },
                    ]
                  },
                ]
              },
              {
                tag: "Prtry",
                label: "Proprietary",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                rules: "For bank or community specific transaction coding",
                children: [
                  {
                    tag: "Cd",
                    label: "Code",
                    type: "Text",
                    mult: "1..1",
                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                    rules: "Code format is depending on the issuer. It may be a composite code.",
                  },
                  {
                    tag: "Issr",
                    label: "Issuer",
                    type: "Text",
                    mult: "0..1",
                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                    rules: "Value samples (not exhausted): BAI = BAI Code SWIFT = Swift Code BBA = Belgian Code CFONB = French Code FFFS = Finnish Code ZKA = German Code GVC = German Code AEB = Spanish Code DBA = Danish Code Als",
                  },
                ]
              },
            ]
          },
          {
            tag: "AddtlInfInd",
            label: "AdditionalInformationIndicator",
            mult: "0..1",
            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
            rules: "Recommendation: may be used in case to cross-reference a separate notification or account report message",
            children: [
              {
                tag: "MsgNmId",
                label: "MessageNameIdentification",
                type: "Text",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
              },
              {
                tag: "MsgId",
                label: "MessageIdentification",
                type: "Text",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
              },
            ]
          },
          {
            tag: "AmtDtls",
            label: "AmountDetails",
            type: "+",
            mult: "0..1",
            usage: { ach: "C", wire: "C", cheques: "C", sepa: "C" },
            rules: "All Amount Details are in most cases given on the Transaction Details level (not on Entry level) on single and batch bookings.  When batch booked Entry has underlying transactions with charges, Entry ",
            children: [
              {
                tag: "InstdAmt",
                label: "InstructedAmount",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                children: [
                  {
                    tag: "Amt",
                    label: "Amount",
                    type: "Amount",
                    mult: "1..1",
                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                    hasCcyAttr: true,
                  },
                  {
                    tag: "CcyXchg",
                    label: "CurrencyExchange",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                    children: [
                      {
                        tag: "SrcCcy",
                        label: "SourceCurrency",
                        type: "Code",
                        mult: "1..1",
                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                        rules: "Original amount currency of the currency exchange made",
                      },
                      {
                        tag: "TrgtCcy",
                        label: "TargetCurrency",
                        type: "Code",
                        mult: "0..1",
                        usage: { ach: "C", wire: "C", cheques: "C", sepa: "C" },
                        rules: "Resulting currency of the currency exchange made.  Reported if available.",
                      },
                      {
                        tag: "UnitCcy",
                        label: "UnitCurrency",
                        type: "Code",
                        mult: "0..1",
                        usage: { ach: "C", wire: "C", cheques: "C", sepa: "C" },
                        rules: "Define in which direction the exchange rate is calculated. Reported if available. Decided by the reporting bank or community practice.",
                      },
                      {
                        tag: "XchgRate",
                        label: "ExchangeRate",
                        type: "Rate",
                        mult: "1..1",
                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                      },
                      {
                        tag: "CtrctId",
                        label: "ContractIdentification",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "QtnDt",
                        label: "QuotationDate",
                        type: "DateTime",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                    ]
                  },
                ]
              },
              {
                tag: "TxAmt",
                label: "TransactionAmount",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                children: [
                  {
                    tag: "Amt",
                    label: "Amount",
                    type: "Amount",
                    mult: "1..1",
                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                    hasCcyAttr: true,
                    rules: "Same as reported in 2.78",
                  },
                  {
                    tag: "CcyXchg",
                    label: "CurrencyExchange",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                    children: [
                      {
                        tag: "SrcCcy",
                        label: "SourceCurrency",
                        type: "Code",
                        mult: "1..1",
                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                        rules: "Original amount currency of the currency exchange made",
                      },
                      {
                        tag: "TrgtCcy",
                        label: "TargetCurrency",
                        type: "Code",
                        mult: "0..1",
                        usage: { ach: "C", wire: "C", cheques: "C", sepa: "C" },
                        rules: "Resulting currency of the currency exchange made.  Reported if available.",
                      },
                      {
                        tag: "UnitCcy",
                        label: "UnitCurrency",
                        type: "Code",
                        mult: "0..1",
                        usage: { ach: "C", wire: "C", cheques: "C", sepa: "C" },
                        rules: "Define in which direction the exchange rate is calculated. Reported if available. Decided by the reporting bank or community practice.",
                      },
                      {
                        tag: "XchgRate",
                        label: "ExchangeRate",
                        type: "Rate",
                        mult: "1..1",
                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                      },
                      {
                        tag: "CtrctId",
                        label: "ContractIdentification",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "QtnDt",
                        label: "QuotationDate",
                        type: "DateTime",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                    ]
                  },
                ]
              },
              {
                tag: "CntrValAmt",
                label: "CounterValueAmount",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                rules: "For additional reporting of FX scenarios.",
                children: [
                  {
                    tag: "Amt",
                    label: "Amount",
                    type: "Amount",
                    mult: "1..1",
                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                    hasCcyAttr: true,
                  },
                ]
              },
            ]
          },
          {
            tag: "Chrgs",
            label: "Charges",
            mult: "0..n",
            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
            rules: "Charges applied to Entry level amount only for a batch booked amount. When batch booked Entry has underlying transactions and charges are applicable, Entry level AmountDetails is used for totalling th",
            children: [
              {
                tag: "TtlChrgsAndTaxAmt",
                label: "TotalChargesAndTaxAmount",
                type: "Amount",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                hasCcyAttr: true,
                rules: "Total charges and Tax amount should be repeated in each instance where there are multiple Charge instances",
              },
              {
                tag: "Amt",
                label: "Amount",
                type: "Amount",
                mult: "1..1",
                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                hasCcyAttr: true,
              },
              {
                tag: "CdtDbtInd",
                label: "CreditDebitIndicator",
                type: "Code",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
              },
              {
                tag: "Tp",
                label: "Type",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                children: [
                  {
                    tag: "Cd",
                    label: "Code",
                    type: "Code",
                    mult: "1..1",
                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                    orField: "{Or",
                  },
                ]
              },
              {
                tag: "Rate",
                label: "Rate",
                type: "Rate",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
              },
              {
                tag: "Br",
                label: "Bearer",
                type: "Code",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
              },
              {
                tag: "Pty",
                label: "Party",
                type: "+",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                children: [
                  {
                    tag: "FinInstnId",
                    label: "FinancialInstitutionIdentification",
                    mult: "1..1",
                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                    children: [
                      {
                        tag: "BIC",
                        label: "BIC",
                        type: "Identifier",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "ClrSysMmbId",
                        label: "ClearingSystemMemberIdentification",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        children: [
                          {
                            tag: "ClrSysId",
                            label: "ClearingSystemIdentification",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "Cd",
                                label: "Code",
                                type: "Code",
                                mult: "1..1",
                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                orField: "{Or",
                              },
                              {
                                tag: "Prtry",
                                label: "Proprietary",
                                type: "Text",
                                mult: "1..1",
                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                orField: "Or}",
                              },
                            ]
                          },
                          {
                            tag: "MmbId",
                            label: "MemberIdentification",
                            type: "Text",
                            mult: "1..1",
                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                          },
                        ]
                      },
                    ]
                  },
                ]
              },
            ]
          },
          {
            tag: "Intrst",
            label: "Interest",
            mult: "0..n",
            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
            children: [
              {
                tag: "Amt",
                label: "Amount",
                type: "Amount",
                mult: "1..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                hasCcyAttr: true,
              },
              {
                tag: "CdtDbtInd",
                label: "CreditDebitIndicator",
                type: "Code",
                mult: "1..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
              },
              {
                tag: "Tp",
                label: "Type",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                children: [
                  {
                    tag: "Cd",
                    label: "Code",
                    type: "Code",
                    mult: "1..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                    orField: "{Or",
                  },
                  {
                    tag: "Prtry",
                    label: "Proprietary",
                    type: "Text",
                    mult: "1..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                    orField: "Or}",
                  },
                ]
              },
              {
                tag: "Rate",
                label: "Rate",
                mult: "0..n",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                children: [
                  {
                    tag: "Tp",
                    label: "Type",
                    mult: "1..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                    children: [
                      {
                        tag: "Pctg",
                        label: "Percentage",
                        type: "Rate",
                        mult: "1..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        orField: "{Or",
                      },
                      {
                        tag: "Othr",
                        label: "Other",
                        type: "Text",
                        mult: "1..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        orField: "Or}",
                      },
                    ]
                  },
                  {
                    tag: "VldtyRg",
                    label: "ValidityRange",
                    type: "+",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                    children: [
                      {
                        tag: "Amt",
                        label: "Amount",
                        mult: "1..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        children: [
                          {
                            tag: "FrAmt",
                            label: "FromAmount",
                            mult: "1..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            orField: "{Or",
                            children: [
                              {
                                tag: "BdryAmt",
                                label: "BoundaryAmount",
                                type: "Amount",
                                mult: "1..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Incl",
                                label: "Included",
                                type: "Indicator",
                                mult: "1..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                            ]
                          },
                          {
                            tag: "ToAmt",
                            label: "ToAmount",
                            mult: "1..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            orField: "Or",
                            children: [
                              {
                                tag: "BdryAmt",
                                label: "BoundaryAmount",
                                type: "Amount",
                                mult: "1..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Incl",
                                label: "Included",
                                type: "Indicator",
                                mult: "1..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                            ]
                          },
                          {
                            tag: "FrToAmt",
                            label: "FromToAmount",
                            mult: "1..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            orField: "Or",
                            children: [
                              {
                                tag: "FrAmt",
                                label: "FromAmount",
                                mult: "1..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                children: [
                                  {
                                    tag: "BdryAmt",
                                    label: "BoundaryAmount",
                                    type: "Amount",
                                    mult: "1..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "Incl",
                                    label: "Included",
                                    type: "Indicator",
                                    mult: "1..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                ]
                              },
                              {
                                tag: "ToAmt",
                                label: "ToAmount",
                                mult: "1..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                children: [
                                  {
                                    tag: "BdryAmt",
                                    label: "BoundaryAmount",
                                    type: "Amount",
                                    mult: "1..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "Incl",
                                    label: "Included",
                                    type: "Indicator",
                                    mult: "1..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                ]
                              },
                            ]
                          },
                          {
                            tag: "EQAmt",
                            label: "EqualAmount",
                            type: "Amount",
                            mult: "1..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            orField: "Or",
                          },
                          {
                            tag: "NEQAmt",
                            label: "NotEqualAmount",
                            type: "Amount",
                            mult: "1..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            orField: "Or}",
                          },
                        ]
                      },
                      {
                        tag: "CdtDbtInd",
                        label: "CreditDebitIndicator",
                        type: "Code",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "Ccy",
                        label: "Currency",
                        type: "Code",
                        mult: "1..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                    ]
                  },
                ]
              },
              {
                tag: "FrToDt",
                label: "FromToDate",
                type: "+",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                children: [
                  {
                    tag: "FrDtTm",
                    label: "FromDateTime",
                    type: "DateTime",
                    mult: "1..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                  {
                    tag: "ToDtTm",
                    label: "ToDateTime",
                    type: "DateTime",
                    mult: "1..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                ]
              },
              {
                tag: "Rsn",
                label: "Reason",
                type: "Text",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
              },
            ]
          },
          {
            tag: "NtryDtls",
            label: "EntryDetails",
            mult: "0..n",
            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
            rules: "This provides a breakdown of the transaction details when the entry is 'batched'.  If the entry is not batched and transaction details are to be reported, then transaction details must only occur once",
            children: [
              {
                tag: "Btch",
                label: "Batch",
                mult: "0..1",
                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                children: [
                  {
                    tag: "MsgId",
                    label: "MessageIdentification",
                    type: "Text",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                  {
                    tag: "PmtInfId",
                    label: "PaymentInformationIdentification",
                    type: "Text",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                  {
                    tag: "NbOfTxs",
                    label: "NumberOfTransactions",
                    type: "Text",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                  {
                    tag: "TtlAmt",
                    label: "TotalAmount",
                    type: "Amount",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                    hasCcyAttr: true,
                  },
                  {
                    tag: "CdtDbtInd",
                    label: "CreditDebitIndicator",
                    type: "Code",
                    mult: "0..1",
                    usage: { ach: "C", wire: "C", cheques: "C", sepa: "C" },
                    rules: "Indicate a Debit or Credit , if Total Amount is provided",
                  },
                ]
              },
              {
                tag: "TxDtls",
                label: "TransactionDetails",
                mult: "0..n",
                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                children: [
                  {
                    tag: "Refs",
                    label: "References",
                    mult: "0..1",
                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                    children: [
                      {
                        tag: "MsgId",
                        label: "MessageIdentification",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "AcctSvcrRef",
                        label: "AccountServicerReference",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        rules: "The account servicing institution's reference for the transaction",
                      },
                      {
                        tag: "PmtInfId",
                        label: "PaymentInformationIdentification",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "InstrId",
                        label: "InstructionIdentification",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "EndToEndId",
                        label: "EndToEndIdentification",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "C", wire: "C", cheques: "C", sepa: "R" },
                        rules: "The end-to-end identification must be reported when it is known by the reporting bank. For SEPA the EndToEndId can be 'NOTPROVIDED'.",
                      },
                      {
                        tag: "TxId",
                        label: "TransactionIdentification",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "MndtId",
                        label: "MandateIdentification",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "C", wire: "C", cheques: "NU", sepa: "C" },
                        rules: "For reporting  Direct Debits, as appropriate",
                      },
                      {
                        tag: "ChqNb",
                        label: "ChequeNumber",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "NU", wire: "NU", cheques: "BD/C", sepa: "NU" },
                        rules: "Only used for Cheque and supplied if available  (conditional)",
                      },
                      {
                        tag: "ClrSysRef",
                        label: "ClearingSystemReference",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        rules: "Where supplied by Clearing House for both payment and incoming",
                      },
                      {
                        tag: "Prtry",
                        label: "Proprietary",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        children: [
                          {
                            tag: "Tp",
                            label: "Type",
                            type: "Text",
                            mult: "1..1",
                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                          },
                          {
                            tag: "Ref",
                            label: "Reference",
                            type: "Text",
                            mult: "1..1",
                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                          },
                        ]
                      },
                    ]
                  },
                  {
                    tag: "AmtDtls",
                    label: "AmountDetails",
                    type: "+",
                    mult: "0..1",
                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                    rules: "All Amount Details are in all cases given on the Transaction Details level on single and batch bookings. For consistency purposes Entry/Amount information is repeated at TransactionDetails/AmountDetai",
                    children: [
                      {
                        tag: "InstdAmt",
                        label: "InstructedAmount",
                        mult: "0..1",
                        usage: { ach: "C", wire: "C", cheques: "C", sepa: "C" },
                        rules: "Used for original amount in original currency and is the gross value (i.e. prior to application of charges) in same currency situations.  For example in the inter-bank MT103 message this amount report",
                        children: [
                          {
                            tag: "Amt",
                            label: "Amount",
                            type: "Amount",
                            mult: "1..1",
                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                            hasCcyAttr: true,
                          },
                          {
                            tag: "CcyXchg",
                            label: "CurrencyExchange",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            rules: "For reporting FX-transaction details",
                            children: [
                              {
                                tag: "SrcCcy",
                                label: "SourceCurrency",
                                type: "Code",
                                mult: "1..1",
                                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                rules: "Original amount currency of the currency exchange made",
                              },
                              {
                                tag: "TrgtCcy",
                                label: "TargetCurrency",
                                type: "Code",
                                mult: "0..1",
                                usage: { ach: "C", wire: "C", cheques: "C", sepa: "C" },
                                rules: "Resulting currency of the currency exchange made.  Reported if available.",
                              },
                              {
                                tag: "UnitCcy",
                                label: "UnitCurrency",
                                type: "Code",
                                mult: "0..1",
                                usage: { ach: "C", wire: "C", cheques: "C", sepa: "C" },
                                rules: "Define in which direction the exchange rate is calculated. Reported if available. Decided by the reporting bank or community practice.",
                              },
                              {
                                tag: "XchgRate",
                                label: "ExchangeRate",
                                type: "Rate",
                                mult: "1..1",
                                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                              },
                              {
                                tag: "CtrctId",
                                label: "ContractIdentification",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "QtnDt",
                                label: "QuotationDate",
                                type: "DateTime",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                            ]
                          },
                        ]
                      },
                      {
                        tag: "TxAmt",
                        label: "TransactionAmount",
                        mult: "0..1",
                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                        rules: "EPC Mandated  for SEPA payments.   Recommendation: This amount is to be used for matching and aggregation purpose and it is used in all cases when AmountDetails structure is used.  It is always in the",
                        children: [
                          {
                            tag: "Amt",
                            label: "Amount",
                            type: "Amount",
                            mult: "1..1",
                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                            hasCcyAttr: true,
                          },
                          {
                            tag: "CcyXchg",
                            label: "CurrencyExchange",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            rules: "For reporting FX transaction details.",
                            children: [
                              {
                                tag: "SrcCcy",
                                label: "SourceCurrency",
                                type: "Code",
                                mult: "1..1",
                                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                rules: "Original amount currency of the currency exchange made",
                              },
                              {
                                tag: "TrgtCcy",
                                label: "TargetCurrency",
                                type: "Code",
                                mult: "0..1",
                                usage: { ach: "C", wire: "C", cheques: "C", sepa: "C" },
                                rules: "Resulting currency of the currency exchange made.  Reported if available.",
                              },
                              {
                                tag: "UnitCcy",
                                label: "UnitCurrency",
                                type: "Code",
                                mult: "0..1",
                                usage: { ach: "C", wire: "C", cheques: "C", sepa: "C" },
                                rules: "Define in which direction the exchange rate is calculated. Reported if available. Decided by the reporting bank or community practice.",
                              },
                              {
                                tag: "XchgRate",
                                label: "ExchangeRate",
                                type: "Rate",
                                mult: "1..1",
                                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                rules: "Given in direction of UnitCurrency and Quotation Currency like “EUR/USD exchange rate is 1.3 (USD per EUR), the price currency is USD and the unit currency is EUR”",
                              },
                              {
                                tag: "CtrctId",
                                label: "ContractIdentification",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "QtnDt",
                                label: "QuotationDate",
                                type: "DateTime",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                            ]
                          },
                        ]
                      },
                      {
                        tag: "CntrValAmt",
                        label: "CounterValueAmount",
                        mult: "0..1",
                        usage: { ach: "C", wire: "C", cheques: "C", sepa: "C" },
                        rules: "Counter Value is used for currency conversion reporting.  It is used and available only in currency exchange cases.  In Debit entries the CounterValueAmount reports the result amount converted from th",
                        children: [
                          {
                            tag: "Amt",
                            label: "Amount",
                            type: "Amount",
                            mult: "1..1",
                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                            hasCcyAttr: true,
                          },
                        ]
                      },
                      {
                        tag: "PrtryAmt",
                        label: "ProprietaryAmount",
                        mult: "0..n",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        rules: "This value can be used by the bank for additional amount reporting on community or bank-specific purposes.",
                        children: [
                          {
                            tag: "Tp",
                            label: "Type",
                            type: "Text",
                            mult: "1..1",
                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                            rules: "Values: IBS = Interbank settlement amount (for example MT103 32A field)  AOS = additional counter-value information for some banking communities",
                          },
                          {
                            tag: "Amt",
                            label: "Amount",
                            type: "Amount",
                            mult: "1..1",
                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                            hasCcyAttr: true,
                          },
                          {
                            tag: "CcyXchg",
                            label: "CurrencyExchange",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "" },
                            rules: "For reporting FX transaction details.",
                            children: [
                              {
                                tag: "SrcCcy",
                                label: "SourceCurrency",
                                type: "Code",
                                mult: "1..1",
                                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                rules: "Original amount currency of the currency exchange made",
                              },
                              {
                                tag: "TrgtCcy",
                                label: "TargetCurrency",
                                type: "Code",
                                mult: "0..1",
                                usage: { ach: "C", wire: "C", cheques: "C", sepa: "C" },
                                rules: "Resulting currency of the currency exchange made.  Reported if available.",
                              },
                              {
                                tag: "UnitCcy",
                                label: "UnitCurrency",
                                type: "Code",
                                mult: "0..1",
                                usage: { ach: "C", wire: "C", cheques: "C", sepa: "C" },
                                rules: "Define in which direction the exchange rate is calculated. Reported if available. Decided by the reporting bank or community practice.",
                              },
                              {
                                tag: "XchgRate",
                                label: "ExchangeRate",
                                type: "Rate",
                                mult: "1..1",
                                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                              },
                              {
                                tag: "CtrctId",
                                label: "ContractIdentification",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "QtnDt",
                                label: "QuotationDate",
                                type: "DateTime",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                            ]
                          },
                        ]
                      },
                    ]
                  },
                  {
                    tag: "Avlbty",
                    label: "Availability",
                    mult: "0..n",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                    rules: "Recommendation is to use Actual Date. Note BAI only uses number of days as US market practice.",
                    children: [
                      {
                        tag: "Dt",
                        label: "Date",
                        mult: "1..1",
                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                        children: [
                          {
                            tag: "NbOfDays",
                            label: "NumberOfDays",
                            type: "Text",
                            mult: "1..1",
                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                            orField: "{Or",
                          },
                          {
                            tag: "ActlDt",
                            label: "ActualDate",
                            type: "DateTime",
                            mult: "1..1",
                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                            orField: "Or}",
                          },
                        ]
                      },
                      {
                        tag: "Amt",
                        label: "Amount",
                        type: "Amount",
                        mult: "1..1",
                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                        hasCcyAttr: true,
                      },
                      {
                        tag: "CdtDbtInd",
                        label: "CreditDebitIndicator",
                        type: "Code",
                        mult: "1..1",
                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                      },
                    ]
                  },
                  {
                    tag: "BkTxCd",
                    label: "BankTransactionCode",
                    mult: "0..1",
                    usage: { ach: "C", wire: "C", cheques: "C", sepa: "C" },
                    rules: "Further qualification of the entry level bank transaction code.  Bank Transaction Code must be provided at  entry level and maybe provided at transaction detail level.  Note: Domain and/or proprietary",
                    children: [
                      {
                        tag: "Domn",
                        label: "Domain",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        rules: "Recommendation suggested that standard BTC are used as first priority",
                        children: [
                          {
                            tag: "Cd",
                            label: "Code",
                            type: "Code",
                            mult: "1..1",
                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                          },
                          {
                            tag: "Fmly",
                            label: "Family",
                            mult: "1..1",
                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                            children: [
                              {
                                tag: "Cd",
                                label: "Code",
                                type: "Code",
                                mult: "1..1",
                                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                              },
                              {
                                tag: "SubFmlyCd",
                                label: "SubFamilyCode",
                                type: "Code",
                                mult: "1..1",
                                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                              },
                            ]
                          },
                        ]
                      },
                      {
                        tag: "Prtry",
                        label: "Proprietary",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        rules: "For bank or community specific transaction coding",
                        children: [
                          {
                            tag: "Cd",
                            label: "Code",
                            type: "Text",
                            mult: "1..1",
                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                            rules: "Code format is depending on the issuer. It may be a composite code.",
                          },
                          {
                            tag: "Issr",
                            label: "Issuer",
                            type: "Text",
                            mult: "0..1",
                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                            rules: "Value samples (not exhausted): BAI = BAI Code SWIFT = Swift Code BBA = Belgian Code CFONB = French Code FFFS = Finnish Code ZKA = German Code GVC = German Code AEB = Spanish Code DBA = Danish Code Als",
                          },
                        ]
                      },
                    ]
                  },
                  {
                    tag: "Chrgs",
                    label: "Charges",
                    mult: "0..n",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                    rules: "Charges against the amount reported at Entry level (single, batch or aggregate amount booking). When batch booked Entry has underlying transactions with charges, the charges will be shown against each",
                    children: [
                      {
                        tag: "TtlChrgsAndTaxAmt",
                        label: "TotalChargesAndTaxAmount",
                        type: "Amount",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        hasCcyAttr: true,
                        rules: "Total of all Charges and Taxes applied to the transaction",
                      },
                      {
                        tag: "Amt",
                        label: "Amount",
                        type: "Amount",
                        mult: "1..1",
                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                        hasCcyAttr: true,
                      },
                      {
                        tag: "CdtDbtInd",
                        label: "CreditDebitIndicator",
                        type: "Code",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "Tp",
                        label: "Type",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        children: [
                          {
                            tag: "Cd",
                            label: "Code",
                            type: "Code",
                            mult: "1..1",
                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                            orField: "{Or",
                          },
                          {
                            tag: "Prtry",
                            label: "Proprietary",
                            type: "+",
                            mult: "1..1",
                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                            orField: "Or}",
                            children: [
                              {
                                tag: "Id",
                                label: "Identification",
                                type: "Text",
                                mult: "1..1",
                                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                              },
                              {
                                tag: "Issr",
                                label: "Issuer",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                            ]
                          },
                        ]
                      },
                      {
                        tag: "Rate",
                        label: "Rate",
                        type: "Rate",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "Br",
                        label: "Bearer",
                        type: "Code",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        rules: "Recommended to always be provided when charges are reported",
                      },
                      {
                        tag: "Pty",
                        label: "Party",
                        type: "+",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        children: [
                          {
                            tag: "FinInstnId",
                            label: "FinancialInstitutionIdentification",
                            mult: "1..1",
                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                            children: [
                              {
                                tag: "BIC",
                                label: "BIC",
                                type: "Identifier",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                rules: "If not informed, the charge is taken by accountholders bank.",
                              },
                              {
                                tag: "ClrSysMmbId",
                                label: "ClearingSystemMemberIdentification",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                children: [
                                  {
                                    tag: "ClrSysId",
                                    label: "ClearingSystemIdentification",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                    children: [
                                      {
                                        tag: "Cd",
                                        label: "Code",
                                        type: "Code",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                        orField: "{Or",
                                      },
                                      {
                                        tag: "Prtry",
                                        label: "Proprietary",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                        orField: "Or}",
                                      },
                                    ]
                                  },
                                  {
                                    tag: "MmbId",
                                    label: "MemberIdentification",
                                    type: "Text",
                                    mult: "1..1",
                                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                  },
                                ]
                              },
                              {
                                tag: "Nm",
                                label: "Name",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "PstlAdr",
                                label: "PostalAddress",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                children: [
                                  {
                                    tag: "AdrTp",
                                    label: "AddressType",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "Dept",
                                    label: "Department",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "SubDept",
                                    label: "SubDepartment",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "StrtNm",
                                    label: "StreetName",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "BldgNb",
                                    label: "BuildingNumber",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "PstCd",
                                    label: "PostCode",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "TwnNm",
                                    label: "TownName",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "CtrySubDvsn",
                                    label: "CountrySubDivision",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "Ctry",
                                    label: "Country",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "AdrLine",
                                    label: "AddressLine",
                                    type: "Text",
                                    mult: "0..7",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                ]
                              },
                              {
                                tag: "Othr",
                                label: "Other",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                children: [
                                  {
                                    tag: "Id",
                                    label: "Identification",
                                    type: "Text",
                                    mult: "1..1",
                                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                  },
                                  {
                                    tag: "SchmeNm",
                                    label: "SchemeName",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                    children: [
                                      {
                                        tag: "Cd",
                                        label: "Code",
                                        type: "Code",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                        orField: "{Or",
                                      },
                                      {
                                        tag: "Prtry",
                                        label: "Proprietary",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                        orField: "Or}",
                                      },
                                    ]
                                  },
                                  {
                                    tag: "Issr",
                                    label: "Issuer",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                ]
                              },
                            ]
                          },
                          {
                            tag: "BrnchId",
                            label: "BranchIdentification",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "Id",
                                label: "Identification",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Nm",
                                label: "Name",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "PstlAdr",
                                label: "PostalAddress",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                children: [
                                  {
                                    tag: "AdrTp",
                                    label: "AddressType",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "Dept",
                                    label: "Department",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "SubDept",
                                    label: "SubDepartment",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "StrtNm",
                                    label: "StreetName",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "BldgNb",
                                    label: "BuildingNumber",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "PstCd",
                                    label: "PostCode",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "TwnNm",
                                    label: "TownName",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "CtrySubDvsn",
                                    label: "CountrySubDivision",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "Ctry",
                                    label: "Country",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "AdrLine",
                                    label: "AddressLine",
                                    type: "Text",
                                    mult: "0..7",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                ]
                              },
                            ]
                          },
                        ]
                      },
                      {
                        tag: "Tax",
                        label: "Tax",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        children: [
                          {
                            tag: "Id",
                            label: "Identification",
                            type: "Text",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                          {
                            tag: "Rate",
                            label: "Rate",
                            type: "Rate",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                          {
                            tag: "Amt",
                            label: "Amount",
                            type: "Amount",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            hasCcyAttr: true,
                          },
                        ]
                      },
                    ]
                  },
                  {
                    tag: "Intrst",
                    label: "Interest",
                    mult: "0..n",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                    children: [
                      {
                        tag: "Amt",
                        label: "Amount",
                        type: "Amount",
                        mult: "1..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        hasCcyAttr: true,
                      },
                      {
                        tag: "CdtDbtInd",
                        label: "CreditDebitIndicator",
                        type: "Code",
                        mult: "1..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "Tp",
                        label: "Type",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        children: [
                          {
                            tag: "Cd",
                            label: "Code",
                            type: "Code",
                            mult: "1..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            orField: "{Or",
                          },
                          {
                            tag: "Prtry",
                            label: "Proprietary",
                            type: "Text",
                            mult: "1..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            orField: "Or}",
                          },
                        ]
                      },
                      {
                        tag: "Rate",
                        label: "Rate",
                        mult: "0..n",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        children: [
                          {
                            tag: "Tp",
                            label: "Type",
                            mult: "1..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "Pctg",
                                label: "Percentage",
                                type: "Rate",
                                mult: "1..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                orField: "{Or",
                              },
                              {
                                tag: "Othr",
                                label: "Other",
                                type: "Text",
                                mult: "1..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                orField: "Or}",
                              },
                            ]
                          },
                          {
                            tag: "VldtyRg",
                            label: "ValidityRange",
                            type: "+",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "Amt",
                                label: "Amount",
                                mult: "1..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                children: [
                                  {
                                    tag: "FrAmt",
                                    label: "FromAmount",
                                    mult: "1..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                    orField: "{Or",
                                    children: [
                                      {
                                        tag: "BdryAmt",
                                        label: "BoundaryAmount",
                                        type: "Amount",
                                        mult: "1..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                      },
                                      {
                                        tag: "Incl",
                                        label: "Included",
                                        type: "Indicator",
                                        mult: "1..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                      },
                                    ]
                                  },
                                  {
                                    tag: "ToAmt",
                                    label: "ToAmount",
                                    mult: "1..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                    orField: "Or",
                                    children: [
                                      {
                                        tag: "BdryAmt",
                                        label: "BoundaryAmount",
                                        type: "Amount",
                                        mult: "1..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                      },
                                      {
                                        tag: "Incl",
                                        label: "Included",
                                        type: "Indicator",
                                        mult: "1..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                      },
                                    ]
                                  },
                                  {
                                    tag: "FrToAmt",
                                    label: "FromToAmount",
                                    mult: "1..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                    orField: "Or",
                                    children: [
                                      {
                                        tag: "FrAmt",
                                        label: "FromAmount",
                                        mult: "1..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                        children: [
                                          {
                                            tag: "BdryAmt",
                                            label: "BoundaryAmount",
                                            type: "Amount",
                                            mult: "1..1",
                                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                          },
                                          {
                                            tag: "Incl",
                                            label: "Included",
                                            type: "Indicator",
                                            mult: "1..1",
                                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                          },
                                        ]
                                      },
                                      {
                                        tag: "ToAmt",
                                        label: "ToAmount",
                                        mult: "1..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                        children: [
                                          {
                                            tag: "BdryAmt",
                                            label: "BoundaryAmount",
                                            type: "Amount",
                                            mult: "1..1",
                                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                          },
                                          {
                                            tag: "Incl",
                                            label: "Included",
                                            type: "Indicator",
                                            mult: "1..1",
                                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                          },
                                        ]
                                      },
                                    ]
                                  },
                                  {
                                    tag: "EQAmt",
                                    label: "EqualAmount",
                                    type: "Amount",
                                    mult: "1..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                    orField: "Or",
                                  },
                                  {
                                    tag: "NEQAmt",
                                    label: "NotEqualAmount",
                                    type: "Amount",
                                    mult: "1..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                    orField: "Or}",
                                  },
                                ]
                              },
                              {
                                tag: "CdtDbtInd",
                                label: "CreditDebitIndicator",
                                type: "Code",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Ccy",
                                label: "Currency",
                                type: "Code",
                                mult: "1..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                            ]
                          },
                        ]
                      },
                      {
                        tag: "FrToDt",
                        label: "FromToDate",
                        type: "+",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        children: [
                          {
                            tag: "FrDtTm",
                            label: "FromDateTime",
                            type: "DateTime",
                            mult: "1..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                          {
                            tag: "ToDtTm",
                            label: "ToDateTime",
                            type: "DateTime",
                            mult: "1..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                        ]
                      },
                      {
                        tag: "Rsn",
                        label: "Reason",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                    ]
                  },
                  {
                    tag: "RltdPties",
                    label: "RelatedParties",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "C" },
                    children: [
                      {
                        tag: "InitgPty",
                        label: "InitiatingParty",
                        type: "+",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        rules: "Party initiating the payment to an agent. In the payment context, this can either be the debtor (in a credit transfer), the creditor (in a direct debit), or a party that initiates the payment on behal",
                        children: [
                          {
                            tag: "Nm",
                            label: "Name",
                            type: "Text",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                          {
                            tag: "PstlAdr",
                            label: "PostalAddress",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "AdrTp",
                                label: "AddressType",
                                type: "Code",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Dept",
                                label: "Department",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "SubDept",
                                label: "SubDepartment",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "StrtNm",
                                label: "StreetName",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "BldgNb",
                                label: "BuildingNumber",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "PstCd",
                                label: "PostCode",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "TwnNm",
                                label: "TownName",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "CtrySubDvsn",
                                label: "CountrySubDivision",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Ctry",
                                label: "Country",
                                type: "Code",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "AdrLine",
                                label: "AddressLine",
                                type: "Text",
                                mult: "0..7",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                            ]
                          },
                          {
                            tag: "Id",
                            label: "Identification",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "OrgId",
                                label: "OrganisationIdentification",
                                mult: "1..1",
                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                orField: "{Or",
                                children: [
                                  {
                                    tag: "BICOrBEI",
                                    label: "BICOrBEI",
                                    type: "Identifier",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "Othr",
                                    label: "Other",
                                    mult: "0..n",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                    children: [
                                      {
                                        tag: "Id",
                                        label: "Identification",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                      },
                                      {
                                        tag: "SchmeNm",
                                        label: "SchemeName",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                        children: [
                                          {
                                            tag: "Cd",
                                            label: "Code",
                                            type: "Code",
                                            mult: "1..1",
                                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                            orField: "{{Or",
                                          },
                                          {
                                            tag: "Prtry",
                                            label: "Proprietary",
                                            type: "Text",
                                            mult: "1..1",
                                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                            orField: "Or}}",
                                          },
                                        ]
                                      },
                                      {
                                        tag: "Issr",
                                        label: "Issuer",
                                        type: "Text",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                      },
                                    ]
                                  },
                                ]
                              },
                              {
                                tag: "PrvtId",
                                label: "PrivateIdentification",
                                mult: "1..1",
                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                orField: "Or}",
                                children: [
                                  {
                                    tag: "DtAndPlcOfBirth",
                                    label: "DateAndPlaceOfBirth",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                    children: [
                                      {
                                        tag: "BirthDt",
                                        label: "BirthDate",
                                        type: "DateTime",
                                        mult: "1..1",
                                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                      },
                                      {
                                        tag: "PrvcOfBirth",
                                        label: "ProvinceOfBirth",
                                        type: "Text",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                      },
                                      {
                                        tag: "CityOfBirth",
                                        label: "CityOfBirth",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                      },
                                      {
                                        tag: "CtryOfBirth",
                                        label: "CountryOfBirth",
                                        type: "Code",
                                        mult: "1..1",
                                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                      },
                                    ]
                                  },
                                  {
                                    tag: "Othr",
                                    label: "Other",
                                    mult: "0..n",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                    children: [
                                      {
                                        tag: "Id",
                                        label: "Identification",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                      },
                                      {
                                        tag: "SchmeNm",
                                        label: "SchemeName",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                        children: [
                                          {
                                            tag: "Cd",
                                            label: "Code",
                                            type: "Code",
                                            mult: "1..1",
                                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                            orField: "{{Or",
                                          },
                                          {
                                            tag: "Prtry",
                                            label: "Proprietary",
                                            type: "Text",
                                            mult: "1..1",
                                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                            orField: "Or}}",
                                          },
                                        ]
                                      },
                                      {
                                        tag: "Issr",
                                        label: "Issuer",
                                        type: "Text",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                      },
                                    ]
                                  },
                                ]
                              },
                            ]
                          },
                          {
                            tag: "CtryOfRes",
                            label: "CountryOfResidence",
                            type: "Code",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                          {
                            tag: "CtctDtls",
                            label: "ContactDetails",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "NmPrfx",
                                label: "NamePrefix",
                                type: "Code",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Nm",
                                label: "Name",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "PhneNb",
                                label: "PhoneNumber",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "MobNb",
                                label: "MobileNumber",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "FaxNb",
                                label: "FaxNumber",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "EmailAdr",
                                label: "EmailAddress",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Othr",
                                label: "Other",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                            ]
                          },
                        ]
                      },
                      {
                        tag: "Dbtr",
                        label: "Debtor",
                        type: "+",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "C" },
                        rules: "For outward payments, report if different from account owner. For inward payments, report where available. In instances where the ReversalIndicator <RvslInd> is TRUE, the Creditor and Debtor must be t",
                        children: [
                          {
                            tag: "Nm",
                            label: "Name",
                            type: "Text",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                          {
                            tag: "PstlAdr",
                            label: "PostalAddress",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "AdrTp",
                                label: "AddressType",
                                type: "Code",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Dept",
                                label: "Department",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "SubDept",
                                label: "SubDepartment",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "StrtNm",
                                label: "StreetName",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "BldgNb",
                                label: "BuildingNumber",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "PstCd",
                                label: "PostCode",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "TwnNm",
                                label: "TownName",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "CtrySubDvsn",
                                label: "CountrySubDivision",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Ctry",
                                label: "Country",
                                type: "Code",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "AdrLine",
                                label: "AddressLine",
                                type: "Text",
                                mult: "0..7",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                            ]
                          },
                          {
                            tag: "Id",
                            label: "Identification",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "OrgId",
                                label: "OrganisationIdentification",
                                mult: "1..1",
                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                orField: "{Or",
                                children: [
                                  {
                                    tag: "BICOrBEI",
                                    label: "BICOrBEI",
                                    type: "Identifier",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "Othr",
                                    label: "Other",
                                    mult: "0..n",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                    children: [
                                      {
                                        tag: "Id",
                                        label: "Identification",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                      },
                                      {
                                        tag: "SchmeNm",
                                        label: "SchemeName",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                        children: [
                                          {
                                            tag: "Cd",
                                            label: "Code",
                                            type: "Code",
                                            mult: "1..1",
                                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                            orField: "{{Or",
                                          },
                                          {
                                            tag: "Prtry",
                                            label: "Proprietary",
                                            type: "Text",
                                            mult: "1..1",
                                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                            orField: "Or}}",
                                          },
                                        ]
                                      },
                                      {
                                        tag: "Issr",
                                        label: "Issuer",
                                        type: "Text",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                      },
                                    ]
                                  },
                                ]
                              },
                              {
                                tag: "PrvtId",
                                label: "PrivateIdentification",
                                mult: "1..1",
                                usage: { ach: "XOR", wire: "COR", cheques: "XOR", sepa: "XOR" },
                                orField: "Or}",
                                children: [
                                  {
                                    tag: "DtAndPlcOfBirth",
                                    label: "DateAndPlaceOfBirth",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                    children: [
                                      {
                                        tag: "BirthDt",
                                        label: "BirthDate",
                                        type: "DateTime",
                                        mult: "1..1",
                                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                      },
                                      {
                                        tag: "PrvcOfBirth",
                                        label: "ProvinceOfBirth",
                                        type: "Text",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                      },
                                      {
                                        tag: "CityOfBirth",
                                        label: "CityOfBirth",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                      },
                                      {
                                        tag: "CtryOfBirth",
                                        label: "CountryOfBirth",
                                        type: "Code",
                                        mult: "1..1",
                                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                      },
                                    ]
                                  },
                                  {
                                    tag: "Othr",
                                    label: "Other",
                                    mult: "0..n",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                    children: [
                                      {
                                        tag: "Id",
                                        label: "Identification",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                      },
                                      {
                                        tag: "SchmeNm",
                                        label: "SchemeName",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                        children: [
                                          {
                                            tag: "Cd",
                                            label: "Code",
                                            type: "Code",
                                            mult: "1..1",
                                            usage: { ach: "XOR", wire: "COR", cheques: "XOR", sepa: "XOR" },
                                            orField: "{{Or",
                                          },
                                          {
                                            tag: "Prtry",
                                            label: "Proprietary",
                                            type: "Text",
                                            mult: "1..1",
                                            usage: { ach: "XOR", wire: "COR", cheques: "XOR", sepa: "XOR" },
                                            orField: "Or}}",
                                          },
                                        ]
                                      },
                                      {
                                        tag: "Issr",
                                        label: "Issuer",
                                        type: "Text",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                      },
                                    ]
                                  },
                                ]
                              },
                            ]
                          },
                          {
                            tag: "CtryOfRes",
                            label: "CountryOfResidence",
                            type: "Code",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                          {
                            tag: "CtctDtls",
                            label: "ContactDetails",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "NmPrfx",
                                label: "NamePrefix",
                                type: "Code",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Nm",
                                label: "Name",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "PhneNb",
                                label: "PhoneNumber",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "MobNb",
                                label: "MobileNumber",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "FaxNb",
                                label: "FaxNumber",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "EmailAdr",
                                label: "EmailAddress",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Othr",
                                label: "Other",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                            ]
                          },
                        ]
                      },
                      {
                        tag: "DbtrAcct",
                        label: "DebtorAccount",
                        type: "+",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "C" },
                        rules: "For inward payment, Report where available. Conditional on the country regulatory requirement. Recommendation: If IBAN is available populate in IBAN tag, else populate Other. EPC mandated for SEPA Pay",
                        children: [
                          {
                            tag: "Id",
                            label: "Identification",
                            mult: "1..1",
                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                            children: [
                              {
                                tag: "IBAN",
                                label: "IBAN",
                                type: "Identifier",
                                mult: "1..1",
                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                orField: "{Or",
                              },
                              {
                                tag: "Othr",
                                label: "Other",
                                mult: "1..1",
                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                orField: "Or}",
                                children: [
                                  {
                                    tag: "Id",
                                    label: "Identification",
                                    type: "Text",
                                    mult: "1..1",
                                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                  },
                                  {
                                    tag: "SchmeNm",
                                    label: "SchemeName",
                                    mult: "0..1",
                                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                    children: [
                                      {
                                        tag: "Cd",
                                        label: "Code",
                                        type: "Code",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                        orField: "{{Or",
                                      },
                                      {
                                        tag: "Prtry",
                                        label: "Proprietary",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                        orField: "Or}}",
                                      },
                                    ]
                                  },
                                  {
                                    tag: "Issr",
                                    label: "Issuer",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                ]
                              },
                            ]
                          },
                          {
                            tag: "Tp",
                            label: "Type",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "Cd",
                                label: "Code",
                                type: "Code",
                                mult: "1..1",
                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                orField: "{Or",
                              },
                              {
                                tag: "Prtry",
                                label: "Proprietary",
                                type: "Text",
                                mult: "1..1",
                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                orField: "Or}",
                              },
                            ]
                          },
                          {
                            tag: "Ccy",
                            label: "Currency",
                            type: "Code",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                          {
                            tag: "Nm",
                            label: "Name",
                            type: "Text",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                        ]
                      },
                      {
                        tag: "UltmtDbtr",
                        label: "UltimateDebtor",
                        type: "+",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "C" },
                        rules: "Ultimate party that owes an amount of money to the (ultimate) creditor. EPC mandated for SEPA Payment. In instances where the ReversalIndicator <RvslInd> is TRUE, the Ultimate Creditor and Ultimate De",
                        children: [
                          {
                            tag: "Nm",
                            label: "Name",
                            type: "Text",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "C" },
                          },
                          {
                            tag: "PstlAdr",
                            label: "PostalAddress",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "AdrTp",
                                label: "AddressType",
                                type: "Code",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Dept",
                                label: "Department",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "SubDept",
                                label: "SubDepartment",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "StrtNm",
                                label: "StreetName",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "BldgNb",
                                label: "BuildingNumber",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "PstCd",
                                label: "PostCode",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "TwnNm",
                                label: "TownName",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "CtrySubDvsn",
                                label: "CountrySubDivision",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Ctry",
                                label: "Country",
                                type: "Code",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "AdrLine",
                                label: "AddressLine",
                                type: "Text",
                                mult: "0..7",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                            ]
                          },
                          {
                            tag: "Id",
                            label: "Identification",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "C" },
                            children: [
                              {
                                tag: "OrgId",
                                label: "OrganisationIdentification",
                                mult: "1..1",
                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                orField: "{Or",
                                children: [
                                  {
                                    tag: "BICOrBEI",
                                    label: "BICOrBEI",
                                    type: "Identifier",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "XOR" },
                                  },
                                  {
                                    tag: "Othr",
                                    label: "Other",
                                    mult: "0..n",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "XOR" },
                                    children: [
                                      {
                                        tag: "Id",
                                        label: "Identification",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "C" },
                                      },
                                      {
                                        tag: "SchmeNm",
                                        label: "SchemeName",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                        children: [
                                          {
                                            tag: "Cd",
                                            label: "Code",
                                            type: "Code",
                                            mult: "1..1",
                                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                            orField: "{{Or",
                                          },
                                          {
                                            tag: "Prtry",
                                            label: "Proprietary",
                                            type: "Text",
                                            mult: "1..1",
                                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                            orField: "Or}}",
                                          },
                                        ]
                                      },
                                      {
                                        tag: "Issr",
                                        label: "Issuer",
                                        type: "Text",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                      },
                                    ]
                                  },
                                ]
                              },
                              {
                                tag: "PrvtId",
                                label: "PrivateIdentification",
                                mult: "1..1",
                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                orField: "Or}",
                                children: [
                                  {
                                    tag: "DtAndPlcOfBirth",
                                    label: "DateAndPlaceOfBirth",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                    children: [
                                      {
                                        tag: "BirthDt",
                                        label: "BirthDate",
                                        type: "DateTime",
                                        mult: "1..1",
                                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                      },
                                      {
                                        tag: "PrvcOfBirth",
                                        label: "ProvinceOfBirth",
                                        type: "Text",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                      },
                                      {
                                        tag: "CityOfBirth",
                                        label: "CityOfBirth",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                      },
                                      {
                                        tag: "CtryOfBirth",
                                        label: "CountryOfBirth",
                                        type: "Code",
                                        mult: "1..1",
                                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                      },
                                    ]
                                  },
                                  {
                                    tag: "Othr",
                                    label: "Other",
                                    mult: "0..n",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                    children: [
                                      {
                                        tag: "Id",
                                        label: "Identification",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                      },
                                      {
                                        tag: "SchmeNm",
                                        label: "SchemeName",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                        children: [
                                          {
                                            tag: "Cd",
                                            label: "Code",
                                            type: "Code",
                                            mult: "1..1",
                                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                            orField: "{{Or",
                                          },
                                          {
                                            tag: "Prtry",
                                            label: "Proprietary",
                                            type: "Text",
                                            mult: "1..1",
                                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                            orField: "Or}}",
                                          },
                                        ]
                                      },
                                      {
                                        tag: "Issr",
                                        label: "Issuer",
                                        type: "Text",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                      },
                                    ]
                                  },
                                ]
                              },
                            ]
                          },
                          {
                            tag: "CtryOfRes",
                            label: "CountryOfResidence",
                            type: "Code",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                          {
                            tag: "CtctDtls",
                            label: "ContactDetails",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "NmPrfx",
                                label: "NamePrefix",
                                type: "Code",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Nm",
                                label: "Name",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "PhneNb",
                                label: "PhoneNumber",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "MobNb",
                                label: "MobileNumber",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "FaxNb",
                                label: "FaxNumber",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "EmailAdr",
                                label: "EmailAddress",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Othr",
                                label: "Other",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                            ]
                          },
                        ]
                      },
                      {
                        tag: "Cdtr",
                        label: "Creditor",
                        type: "+",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "C" },
                        rules: "For outward payment, report where available.  In instances where the ReversalIndicator <RvslInd> is TRUE, the Creditor and Debtor must be the same as the Creditor and Debtor of the original entry.  EP",
                        children: [
                          {
                            tag: "Nm",
                            label: "Name",
                            type: "Text",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "R" },
                          },
                          {
                            tag: "PstlAdr",
                            label: "PostalAddress",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "AdrTp",
                                label: "AddressType",
                                type: "Code",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Dept",
                                label: "Department",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "SubDept",
                                label: "SubDepartment",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "StrtNm",
                                label: "StreetName",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "BldgNb",
                                label: "BuildingNumber",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "PstCd",
                                label: "PostCode",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "TwnNm",
                                label: "TownName",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "CtrySubDvsn",
                                label: "CountrySubDivision",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Ctry",
                                label: "Country",
                                type: "Code",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "AdrLine",
                                label: "AddressLine",
                                type: "Text",
                                mult: "0..7",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                            ]
                          },
                          {
                            tag: "Id",
                            label: "Identification",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "OrgId",
                                label: "OrganisationIdentification",
                                mult: "1..1",
                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                orField: "{Or",
                                children: [
                                  {
                                    tag: "BICOrBEI",
                                    label: "BICOrBEI",
                                    type: "Identifier",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "Othr",
                                    label: "Other",
                                    mult: "0..n",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                    children: [
                                      {
                                        tag: "Id",
                                        label: "Identification",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                      },
                                      {
                                        tag: "SchmeNm",
                                        label: "SchemeName",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                        children: [
                                          {
                                            tag: "Cd",
                                            label: "Code",
                                            type: "Code",
                                            mult: "1..1",
                                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                            orField: "{{Or",
                                          },
                                          {
                                            tag: "Prtry",
                                            label: "Proprietary",
                                            type: "Text",
                                            mult: "1..1",
                                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                            orField: "Or}}",
                                          },
                                        ]
                                      },
                                      {
                                        tag: "Issr",
                                        label: "Issuer",
                                        type: "Text",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                      },
                                    ]
                                  },
                                ]
                              },
                              {
                                tag: "PrvtId",
                                label: "PrivateIdentification",
                                mult: "1..1",
                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                orField: "Or}",
                                children: [
                                  {
                                    tag: "DtAndPlcOfBirth",
                                    label: "DateAndPlaceOfBirth",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                    children: [
                                      {
                                        tag: "BirthDt",
                                        label: "BirthDate",
                                        type: "DateTime",
                                        mult: "1..1",
                                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                      },
                                      {
                                        tag: "PrvcOfBirth",
                                        label: "ProvinceOfBirth",
                                        type: "Text",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                      },
                                      {
                                        tag: "CityOfBirth",
                                        label: "CityOfBirth",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                      },
                                      {
                                        tag: "CtryOfBirth",
                                        label: "CountryOfBirth",
                                        type: "Code",
                                        mult: "1..1",
                                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                      },
                                    ]
                                  },
                                  {
                                    tag: "Othr",
                                    label: "Other",
                                    mult: "0..n",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                    children: [
                                      {
                                        tag: "Id",
                                        label: "Identification",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                      },
                                      {
                                        tag: "SchmeNm",
                                        label: "SchemeName",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                        children: [
                                          {
                                            tag: "Cd",
                                            label: "Code",
                                            type: "Code",
                                            mult: "1..1",
                                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                            orField: "{{Or",
                                          },
                                          {
                                            tag: "Prtry",
                                            label: "Proprietary",
                                            type: "Text",
                                            mult: "1..1",
                                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                            orField: "Or}}",
                                          },
                                        ]
                                      },
                                      {
                                        tag: "Issr",
                                        label: "Issuer",
                                        type: "Text",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                      },
                                    ]
                                  },
                                ]
                              },
                            ]
                          },
                          {
                            tag: "CtryOfRes",
                            label: "CountryOfResidence",
                            type: "Code",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                          {
                            tag: "CtctDtls",
                            label: "ContactDetails",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "NmPrfx",
                                label: "NamePrefix",
                                type: "Code",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Nm",
                                label: "Name",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "PhneNb",
                                label: "PhoneNumber",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "MobNb",
                                label: "MobileNumber",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "FaxNb",
                                label: "FaxNumber",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "EmailAdr",
                                label: "EmailAddress",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Othr",
                                label: "Other",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                            ]
                          },
                        ]
                      },
                      {
                        tag: "CdtrAcct",
                        label: "CreditorAccount",
                        type: "+",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "C" },
                        rules: "For outward, payment, Report where available. Recommendation: If IBAN is available populate IBAN tag, else populate Other.  EPC mandated for SEPA Payment",
                        children: [
                          {
                            tag: "Id",
                            label: "Identification",
                            mult: "1..1",
                            usage: { ach: "R", wire: "R", cheques: "NU", sepa: "R" },
                            children: [
                              {
                                tag: "IBAN",
                                label: "IBAN",
                                type: "Identifier",
                                mult: "1..1",
                                usage: { ach: "XOR", wire: "XOR", cheques: "NU", sepa: "R" },
                                orField: "{Or",
                              },
                              {
                                tag: "Othr",
                                label: "Other",
                                mult: "1..1",
                                usage: { ach: "XOR", wire: "XOR", cheques: "NU", sepa: "NU" },
                                orField: "Or}",
                                children: [
                                  {
                                    tag: "Id",
                                    label: "Identification",
                                    type: "Text",
                                    mult: "1..1",
                                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                  },
                                  {
                                    tag: "SchmeNm",
                                    label: "SchemeName",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                    children: [
                                      {
                                        tag: "Cd",
                                        label: "Code",
                                        type: "Code",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                        orField: "{{Or",
                                      },
                                      {
                                        tag: "Prtry",
                                        label: "Proprietary",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                        orField: "Or}}",
                                      },
                                    ]
                                  },
                                  {
                                    tag: "Issr",
                                    label: "Issuer",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                ]
                              },
                            ]
                          },
                          {
                            tag: "Tp",
                            label: "Type",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "Cd",
                                label: "Code",
                                type: "Code",
                                mult: "1..1",
                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                orField: "{Or",
                              },
                              {
                                tag: "Prtry",
                                label: "Proprietary",
                                type: "Text",
                                mult: "1..1",
                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                orField: "Or}",
                              },
                            ]
                          },
                          {
                            tag: "Ccy",
                            label: "Currency",
                            type: "Code",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                          {
                            tag: "Nm",
                            label: "Name",
                            type: "Text",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                        ]
                      },
                      {
                        tag: "UltmtCdtr",
                        label: "UltimateCreditor",
                        type: "+",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "C" },
                        rules: "Ultimate party to which an amount of money is due.  EPC Mandated for SEPA Payments. In instances where the ReversalIndicator <RvslInd> is TRUE, the Ultimate Creditor and Ultimate Debtor must be the sa",
                        children: [
                          {
                            tag: "Nm",
                            label: "Name",
                            type: "Text",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "C" },
                          },
                          {
                            tag: "PstlAdr",
                            label: "PostalAddress",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "AdrTp",
                                label: "AddressType",
                                type: "Code",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Dept",
                                label: "Department",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "SubDept",
                                label: "SubDepartment",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "StrtNm",
                                label: "StreetName",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "BldgNb",
                                label: "BuildingNumber",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "PstCd",
                                label: "PostCode",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "TwnNm",
                                label: "TownName",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "CtrySubDvsn",
                                label: "CountrySubDivision",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Ctry",
                                label: "Country",
                                type: "Code",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "AdrLine",
                                label: "AddressLine",
                                type: "Text",
                                mult: "0..7",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                            ]
                          },
                          {
                            tag: "Id",
                            label: "Identification",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "C" },
                            children: [
                              {
                                tag: "OrgId",
                                label: "OrganisationIdentification",
                                mult: "1..1",
                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                orField: "{Or",
                                children: [
                                  {
                                    tag: "BICOrBEI",
                                    label: "BICOrBEI",
                                    type: "Identifier",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "XOR" },
                                  },
                                  {
                                    tag: "Othr",
                                    label: "Other",
                                    mult: "0..n",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "XOR" },
                                    children: [
                                      {
                                        tag: "Id",
                                        label: "Identification",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                      },
                                      {
                                        tag: "SchmeNm",
                                        label: "SchemeName",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                        children: [
                                          {
                                            tag: "Cd",
                                            label: "Code",
                                            type: "Code",
                                            mult: "1..1",
                                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                            orField: "{{Or",
                                          },
                                          {
                                            tag: "Prtry",
                                            label: "Proprietary",
                                            type: "Text",
                                            mult: "1..1",
                                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                            orField: "Or}}",
                                          },
                                        ]
                                      },
                                      {
                                        tag: "Issr",
                                        label: "Issuer",
                                        type: "Text",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                      },
                                    ]
                                  },
                                ]
                              },
                              {
                                tag: "PrvtId",
                                label: "PrivateIdentification",
                                mult: "1..1",
                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                orField: "Or}",
                                children: [
                                  {
                                    tag: "DtAndPlcOfBirth",
                                    label: "DateAndPlaceOfBirth",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                    children: [
                                      {
                                        tag: "BirthDt",
                                        label: "BirthDate",
                                        type: "DateTime",
                                        mult: "1..1",
                                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                      },
                                      {
                                        tag: "PrvcOfBirth",
                                        label: "ProvinceOfBirth",
                                        type: "Text",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                      },
                                      {
                                        tag: "CityOfBirth",
                                        label: "CityOfBirth",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                      },
                                      {
                                        tag: "CtryOfBirth",
                                        label: "CountryOfBirth",
                                        type: "Code",
                                        mult: "1..1",
                                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                      },
                                    ]
                                  },
                                  {
                                    tag: "Othr",
                                    label: "Other",
                                    mult: "0..n",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                    children: [
                                      {
                                        tag: "Id",
                                        label: "Identification",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                      },
                                      {
                                        tag: "SchmeNm",
                                        label: "SchemeName",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                        children: [
                                          {
                                            tag: "Cd",
                                            label: "Code",
                                            type: "Code",
                                            mult: "1..1",
                                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                            orField: "{{Or",
                                          },
                                          {
                                            tag: "Prtry",
                                            label: "Proprietary",
                                            type: "Text",
                                            mult: "1..1",
                                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                            orField: "Or}}",
                                          },
                                        ]
                                      },
                                      {
                                        tag: "Issr",
                                        label: "Issuer",
                                        type: "Text",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                      },
                                    ]
                                  },
                                ]
                              },
                            ]
                          },
                          {
                            tag: "CtryOfRes",
                            label: "CountryOfResidence",
                            type: "Code",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                          {
                            tag: "CtctDtls",
                            label: "ContactDetails",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "NmPrfx",
                                label: "NamePrefix",
                                type: "Code",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Nm",
                                label: "Name",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "PhneNb",
                                label: "PhoneNumber",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "MobNb",
                                label: "MobileNumber",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "FaxNb",
                                label: "FaxNumber",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "EmailAdr",
                                label: "EmailAddress",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Othr",
                                label: "Other",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                            ]
                          },
                        ]
                      },
                    ]
                  },
                  {
                    tag: "RltdAgts",
                    label: "RelatedAgents",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "R" },
                    children: [
                      {
                        tag: "DbtrAgt",
                        label: "DebtorAgent",
                        type: "+",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "R" },
                        rules: "EPC Mandated for  SEPA CT and DD. One of the following must be provided - BIC or Clearing System Member or Name. In instances where the ReversalIndicator <RvslInd> is TRUE, the Creditor Agent and Debt",
                        children: [
                          {
                            tag: "FinInstnId",
                            label: "FinancialInstitutionIdentification",
                            mult: "1..1",
                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                            children: [
                              {
                                tag: "BIC",
                                label: "BIC",
                                type: "Identifier",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "ClrSysMmbId",
                                label: "ClearingSystemMemberIdentification",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                children: [
                                  {
                                    tag: "ClrSysId",
                                    label: "ClearingSystemIdentification",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                    children: [
                                      {
                                        tag: "Cd",
                                        label: "Code",
                                        type: "Code",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                        orField: "{Or",
                                      },
                                      {
                                        tag: "Prtry",
                                        label: "Proprietary",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                        orField: "Or}",
                                      },
                                    ]
                                  },
                                  {
                                    tag: "MmbId",
                                    label: "MemberIdentification",
                                    type: "Text",
                                    mult: "1..1",
                                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                  },
                                ]
                              },
                              {
                                tag: "Nm",
                                label: "Name",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "PstlAdr",
                                label: "PostalAddress",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                children: [
                                  {
                                    tag: "AdrTp",
                                    label: "AddressType",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "Dept",
                                    label: "Department",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "SubDept",
                                    label: "SubDepartment",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "StrtNm",
                                    label: "StreetName",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "BldgNb",
                                    label: "BuildingNumber",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "PstCd",
                                    label: "PostCode",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "TwnNm",
                                    label: "TownName",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "CtrySubDvsn",
                                    label: "CountrySubDivision",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "Ctry",
                                    label: "Country",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "AdrLine",
                                    label: "AddressLine",
                                    type: "Text",
                                    mult: "0..7",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                ]
                              },
                              {
                                tag: "Othr",
                                label: "Other",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                children: [
                                  {
                                    tag: "Id",
                                    label: "Identification",
                                    type: "Text",
                                    mult: "1..1",
                                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                  },
                                  {
                                    tag: "SchmeNm",
                                    label: "SchemeName",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                    children: [
                                      {
                                        tag: "Cd",
                                        label: "Code",
                                        type: "Code",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                        orField: "{Or",
                                      },
                                      {
                                        tag: "Prtry",
                                        label: "Proprietary",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                        orField: "Or}",
                                      },
                                    ]
                                  },
                                  {
                                    tag: "Issr",
                                    label: "Issuer",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                ]
                              },
                            ]
                          },
                          {
                            tag: "BrnchId",
                            label: "BranchIdentification",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "Id",
                                label: "Identification",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Nm",
                                label: "Name",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "PstlAdr",
                                label: "PostalAddress",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                children: [
                                  {
                                    tag: "AdrTp",
                                    label: "AddressType",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "Dept",
                                    label: "Department",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "SubDept",
                                    label: "SubDepartment",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "StrtNm",
                                    label: "StreetName",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "BldgNb",
                                    label: "BuildingNumber",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "PstCd",
                                    label: "PostCode",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "TwnNm",
                                    label: "TownName",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "CtrySubDvsn",
                                    label: "CountrySubDivision",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "Ctry",
                                    label: "Country",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "AdrLine",
                                    label: "AddressLine",
                                    type: "Text",
                                    mult: "0..7",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                ]
                              },
                            ]
                          },
                        ]
                      },
                      {
                        tag: "CdtrAgt",
                        label: "CreditorAgent",
                        type: "+",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "R" },
                        rules: "EPC Mandated for  SEPA CT and DD. In instances where the ReversalIndicator <RvslInd> is TRUE, the Creditor Agent and Debtor Agent must be the same as the Creditor Agent and Debtor Agent of the origina",
                        children: [
                          {
                            tag: "FinInstnId",
                            label: "FinancialInstitutionIdentification",
                            mult: "1..1",
                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                            children: [
                              {
                                tag: "BIC",
                                label: "BIC",
                                type: "Identifier",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "ClrSysMmbId",
                                label: "ClearingSystemMemberIdentification",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                children: [
                                  {
                                    tag: "ClrSysId",
                                    label: "ClearingSystemIdentification",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                    children: [
                                      {
                                        tag: "Cd",
                                        label: "Code",
                                        type: "Code",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                        orField: "{Or",
                                      },
                                      {
                                        tag: "Prtry",
                                        label: "Proprietary",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                        orField: "Or}",
                                      },
                                    ]
                                  },
                                  {
                                    tag: "MmbId",
                                    label: "MemberIdentification",
                                    type: "Text",
                                    mult: "1..1",
                                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                  },
                                ]
                              },
                              {
                                tag: "Nm",
                                label: "Name",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "PstlAdr",
                                label: "PostalAddress",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                children: [
                                  {
                                    tag: "AdrTp",
                                    label: "AddressType",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "Dept",
                                    label: "Department",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "SubDept",
                                    label: "SubDepartment",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "StrtNm",
                                    label: "StreetName",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "BldgNb",
                                    label: "BuildingNumber",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "PstCd",
                                    label: "PostCode",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "TwnNm",
                                    label: "TownName",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "CtrySubDvsn",
                                    label: "CountrySubDivision",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "Ctry",
                                    label: "Country",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "AdrLine",
                                    label: "AddressLine",
                                    type: "Text",
                                    mult: "0..7",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                ]
                              },
                              {
                                tag: "Othr",
                                label: "Other",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                children: [
                                  {
                                    tag: "Id",
                                    label: "Identification",
                                    type: "Text",
                                    mult: "1..1",
                                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                  },
                                  {
                                    tag: "SchmeNm",
                                    label: "SchemeName",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                    children: [
                                      {
                                        tag: "Cd",
                                        label: "Code",
                                        type: "Code",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                        orField: "{Or",
                                      },
                                      {
                                        tag: "Prtry",
                                        label: "Proprietary",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                        orField: "Or}",
                                      },
                                    ]
                                  },
                                  {
                                    tag: "Issr",
                                    label: "Issuer",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                ]
                              },
                            ]
                          },
                          {
                            tag: "BrnchId",
                            label: "BranchIdentification",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "Id",
                                label: "Identification",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Nm",
                                label: "Name",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "PstlAdr",
                                label: "PostalAddress",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                children: [
                                  {
                                    tag: "AdrTp",
                                    label: "AddressType",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "Dept",
                                    label: "Department",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "SubDept",
                                    label: "SubDepartment",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "StrtNm",
                                    label: "StreetName",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "BldgNb",
                                    label: "BuildingNumber",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "PstCd",
                                    label: "PostCode",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "TwnNm",
                                    label: "TownName",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "CtrySubDvsn",
                                    label: "CountrySubDivision",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "Ctry",
                                    label: "Country",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "AdrLine",
                                    label: "AddressLine",
                                    type: "Text",
                                    mult: "0..7",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                ]
                              },
                            ]
                          },
                        ]
                      },
                      {
                        tag: "IntrmyAgt1",
                        label: "IntermediaryAgent1",
                        type: "+",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                        children: [
                          {
                            tag: "FinInstnId",
                            label: "FinancialInstitutionIdentification",
                            mult: "1..1",
                            usage: { ach: "R", wire: "R", cheques: "NU", sepa: "NU" },
                            children: [
                              {
                                tag: "BIC",
                                label: "BIC",
                                type: "Identifier",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                              },
                              {
                                tag: "ClrSysMmbId",
                                label: "ClearingSystemMemberIdentification",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                children: [
                                  {
                                    tag: "ClrSysId",
                                    label: "ClearingSystemIdentification",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                    children: [
                                      {
                                        tag: "Cd",
                                        label: "Code",
                                        type: "Code",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "NU", sepa: "NU" },
                                        orField: "{Or",
                                      },
                                      {
                                        tag: "Prtry",
                                        label: "Proprietary",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "NU", sepa: "NU" },
                                        orField: "Or}",
                                      },
                                    ]
                                  },
                                  {
                                    tag: "MmbId",
                                    label: "MemberIdentification",
                                    type: "Text",
                                    mult: "1..1",
                                    usage: { ach: "R", wire: "R", cheques: "NU", sepa: "NU" },
                                  },
                                ]
                              },
                              {
                                tag: "Nm",
                                label: "Name",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                              },
                              {
                                tag: "PstlAdr",
                                label: "PostalAddress",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                children: [
                                  {
                                    tag: "AdrTp",
                                    label: "AddressType",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "Dept",
                                    label: "Department",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "SubDept",
                                    label: "SubDepartment",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "StrtNm",
                                    label: "StreetName",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "BldgNb",
                                    label: "BuildingNumber",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "PstCd",
                                    label: "PostCode",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "TwnNm",
                                    label: "TownName",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "CtrySubDvsn",
                                    label: "CountrySubDivision",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "Ctry",
                                    label: "Country",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "AdrLine",
                                    label: "AddressLine",
                                    type: "Text",
                                    mult: "0..7",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                ]
                              },
                              {
                                tag: "Othr",
                                label: "Other",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                children: [
                                  {
                                    tag: "Id",
                                    label: "Identification",
                                    type: "Text",
                                    mult: "1..1",
                                    usage: { ach: "R", wire: "R", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "SchmeNm",
                                    label: "SchemeName",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                    children: [
                                      {
                                        tag: "Cd",
                                        label: "Code",
                                        type: "Code",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "NU", sepa: "NU" },
                                        orField: "{Or",
                                      },
                                      {
                                        tag: "Prtry",
                                        label: "Proprietary",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "NU", sepa: "NU" },
                                        orField: "Or}",
                                      },
                                    ]
                                  },
                                  {
                                    tag: "Issr",
                                    label: "Issuer",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                ]
                              },
                            ]
                          },
                          {
                            tag: "BrnchId",
                            label: "BranchIdentification",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                            children: [
                              {
                                tag: "Id",
                                label: "Identification",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                              },
                              {
                                tag: "Nm",
                                label: "Name",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                              },
                              {
                                tag: "PstlAdr",
                                label: "PostalAddress",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                children: [
                                  {
                                    tag: "AdrTp",
                                    label: "AddressType",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "Dept",
                                    label: "Department",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "SubDept",
                                    label: "SubDepartment",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "StrtNm",
                                    label: "StreetName",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "BldgNb",
                                    label: "BuildingNumber",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "PstCd",
                                    label: "PostCode",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "TwnNm",
                                    label: "TownName",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "CtrySubDvsn",
                                    label: "CountrySubDivision",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "Ctry",
                                    label: "Country",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "AdrLine",
                                    label: "AddressLine",
                                    type: "Text",
                                    mult: "0..7",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                ]
                              },
                            ]
                          },
                        ]
                      },
                      {
                        tag: "IntrmyAgt2",
                        label: "IntermediaryAgent2",
                        type: "+",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                        children: [
                          {
                            tag: "FinInstnId",
                            label: "FinancialInstitutionIdentification",
                            mult: "1..1",
                            usage: { ach: "R", wire: "R", cheques: "NU", sepa: "NU" },
                            children: [
                              {
                                tag: "BIC",
                                label: "BIC",
                                type: "Identifier",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                              },
                              {
                                tag: "ClrSysMmbId",
                                label: "ClearingSystemMemberIdentification",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                children: [
                                  {
                                    tag: "ClrSysId",
                                    label: "ClearingSystemIdentification",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                    children: [
                                      {
                                        tag: "Cd",
                                        label: "Code",
                                        type: "Code",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "NU", sepa: "NU" },
                                        orField: "{Or",
                                      },
                                      {
                                        tag: "Prtry",
                                        label: "Proprietary",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "NU", sepa: "NU" },
                                        orField: "Or}",
                                      },
                                    ]
                                  },
                                  {
                                    tag: "MmbId",
                                    label: "MemberIdentification",
                                    type: "Text",
                                    mult: "1..1",
                                    usage: { ach: "R", wire: "R", cheques: "NU", sepa: "NU" },
                                  },
                                ]
                              },
                              {
                                tag: "Nm",
                                label: "Name",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                              },
                              {
                                tag: "PstlAdr",
                                label: "PostalAddress",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                children: [
                                  {
                                    tag: "AdrTp",
                                    label: "AddressType",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "Dept",
                                    label: "Department",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "SubDept",
                                    label: "SubDepartment",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "StrtNm",
                                    label: "StreetName",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "BldgNb",
                                    label: "BuildingNumber",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "PstCd",
                                    label: "PostCode",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "TwnNm",
                                    label: "TownName",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "CtrySubDvsn",
                                    label: "CountrySubDivision",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "Ctry",
                                    label: "Country",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "AdrLine",
                                    label: "AddressLine",
                                    type: "Text",
                                    mult: "0..7",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                ]
                              },
                              {
                                tag: "Othr",
                                label: "Other",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                children: [
                                  {
                                    tag: "Id",
                                    label: "Identification",
                                    type: "Text",
                                    mult: "1..1",
                                    usage: { ach: "R", wire: "R", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "SchmeNm",
                                    label: "SchemeName",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                    children: [
                                      {
                                        tag: "Cd",
                                        label: "Code",
                                        type: "Code",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "NU", sepa: "NU" },
                                        orField: "{Or",
                                      },
                                      {
                                        tag: "Prtry",
                                        label: "Proprietary",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "NU", sepa: "NU" },
                                        orField: "Or}",
                                      },
                                    ]
                                  },
                                  {
                                    tag: "Issr",
                                    label: "Issuer",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                ]
                              },
                            ]
                          },
                          {
                            tag: "BrnchId",
                            label: "BranchIdentification",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                            children: [
                              {
                                tag: "Id",
                                label: "Identification",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                              },
                              {
                                tag: "Nm",
                                label: "Name",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                              },
                              {
                                tag: "PstlAdr",
                                label: "PostalAddress",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                children: [
                                  {
                                    tag: "AdrTp",
                                    label: "AddressType",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "Dept",
                                    label: "Department",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "SubDept",
                                    label: "SubDepartment",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "StrtNm",
                                    label: "StreetName",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "BldgNb",
                                    label: "BuildingNumber",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "PstCd",
                                    label: "PostCode",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "TwnNm",
                                    label: "TownName",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "CtrySubDvsn",
                                    label: "CountrySubDivision",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "Ctry",
                                    label: "Country",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "AdrLine",
                                    label: "AddressLine",
                                    type: "Text",
                                    mult: "0..7",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                ]
                              },
                            ]
                          },
                        ]
                      },
                      {
                        tag: "IntrmyAgt3",
                        label: "IntermediaryAgent3",
                        type: "+",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                        children: [
                          {
                            tag: "FinInstnId",
                            label: "FinancialInstitutionIdentification",
                            mult: "1..1",
                            usage: { ach: "R", wire: "R", cheques: "NU", sepa: "NU" },
                            children: [
                              {
                                tag: "BIC",
                                label: "BIC",
                                type: "Identifier",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                              },
                              {
                                tag: "ClrSysMmbId",
                                label: "ClearingSystemMemberIdentification",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                children: [
                                  {
                                    tag: "ClrSysId",
                                    label: "ClearingSystemIdentification",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                    children: [
                                      {
                                        tag: "Cd",
                                        label: "Code",
                                        type: "Code",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "NU", sepa: "NU" },
                                        orField: "{Or",
                                      },
                                      {
                                        tag: "Prtry",
                                        label: "Proprietary",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "NU", sepa: "NU" },
                                        orField: "Or}",
                                      },
                                    ]
                                  },
                                  {
                                    tag: "MmbId",
                                    label: "MemberIdentification",
                                    type: "Text",
                                    mult: "1..1",
                                    usage: { ach: "R", wire: "R", cheques: "NU", sepa: "NU" },
                                  },
                                ]
                              },
                              {
                                tag: "Nm",
                                label: "Name",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                              },
                              {
                                tag: "PstlAdr",
                                label: "PostalAddress",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                children: [
                                  {
                                    tag: "AdrTp",
                                    label: "AddressType",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "Dept",
                                    label: "Department",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "SubDept",
                                    label: "SubDepartment",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "StrtNm",
                                    label: "StreetName",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "BldgNb",
                                    label: "BuildingNumber",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "PstCd",
                                    label: "PostCode",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "TwnNm",
                                    label: "TownName",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "CtrySubDvsn",
                                    label: "CountrySubDivision",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "Ctry",
                                    label: "Country",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "AdrLine",
                                    label: "AddressLine",
                                    type: "Text",
                                    mult: "0..7",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                ]
                              },
                              {
                                tag: "Othr",
                                label: "Other",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                children: [
                                  {
                                    tag: "Id",
                                    label: "Identification",
                                    type: "Text",
                                    mult: "1..1",
                                    usage: { ach: "R", wire: "R", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "SchmeNm",
                                    label: "SchemeName",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                    children: [
                                      {
                                        tag: "Cd",
                                        label: "Code",
                                        type: "Code",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "NU", sepa: "NU" },
                                        orField: "{Or",
                                      },
                                      {
                                        tag: "Prtry",
                                        label: "Proprietary",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "NU", sepa: "NU" },
                                        orField: "Or}",
                                      },
                                    ]
                                  },
                                  {
                                    tag: "Issr",
                                    label: "Issuer",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                ]
                              },
                            ]
                          },
                          {
                            tag: "BrnchId",
                            label: "BranchIdentification",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                            children: [
                              {
                                tag: "Id",
                                label: "Identification",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                              },
                              {
                                tag: "Nm",
                                label: "Name",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                              },
                              {
                                tag: "PstlAdr",
                                label: "PostalAddress",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                children: [
                                  {
                                    tag: "AdrTp",
                                    label: "AddressType",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "Dept",
                                    label: "Department",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "SubDept",
                                    label: "SubDepartment",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "StrtNm",
                                    label: "StreetName",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "BldgNb",
                                    label: "BuildingNumber",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "PstCd",
                                    label: "PostCode",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "TwnNm",
                                    label: "TownName",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "CtrySubDvsn",
                                    label: "CountrySubDivision",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "Ctry",
                                    label: "Country",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                  {
                                    tag: "AdrLine",
                                    label: "AddressLine",
                                    type: "Text",
                                    mult: "0..7",
                                    usage: { ach: "BD", wire: "BD", cheques: "NU", sepa: "NU" },
                                  },
                                ]
                              },
                            ]
                          },
                        ]
                      },
                    ]
                  },
                  {
                    tag: "Purp",
                    label: "Purpose",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "C" },
                    rules: "Report when available",
                    children: [
                      {
                        tag: "Cd",
                        label: "Code",
                        type: "Code",
                        mult: "1..1",
                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                        orField: "{Or",
                      },
                      {
                        tag: "Prtry",
                        label: "Proprietary",
                        type: "Text",
                        mult: "1..1",
                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                        orField: "Or}",
                      },
                    ]
                  },
                  {
                    tag: "RltdRmtInf",
                    label: "RelatedRemittanceInformation",
                    mult: "0..10",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                    rules: "Report when available",
                    children: [
                      {
                        tag: "RmtId",
                        label: "RemittanceIdentification",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "RmtLctnMtd",
                        label: "RemittanceLocationMethod",
                        type: "Code",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "RmtLctnElctrncAdr",
                        label: "RemittanceLocationElectronicAddress",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                    ]
                  },
                  {
                    tag: "RmtInf",
                    label: "RemittanceInformation",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "C" },
                    rules: "For inward SEPA transaction it is recommended to report, when available.",
                    children: [
                      {
                        tag: "Ustrd",
                        label: "Unstructured",
                        type: "Text",
                        mult: "0..n",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "XOR" },
                      },
                      {
                        tag: "Strd",
                        label: "Structured",
                        mult: "0..n",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "XOR" },
                        children: [
                          {
                            tag: "RfrdDocInf",
                            label: "ReferredDocumentInformation",
                            mult: "0..n",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "Tp",
                                label: "Type",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                children: [
                                  {
                                    tag: "CdOrPrtry",
                                    label: "CodeOrProprietary",
                                    mult: "1..1",
                                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                    children: [
                                      {
                                        tag: "Cd",
                                        label: "Code",
                                        type: "Code",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                        orField: "{Or",
                                      },
                                      {
                                        tag: "Prtry",
                                        label: "Proprietary",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                        orField: "Or}",
                                      },
                                    ]
                                  },
                                  {
                                    tag: "Issr",
                                    label: "Issuer",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                ]
                              },
                              {
                                tag: "Nb",
                                label: "Number",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "RltdDt",
                                label: "RelatedDate",
                                type: "DateTime",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                            ]
                          },
                          {
                            tag: "RfrdDocAmt",
                            label: "ReferredDocumentAmount",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "DuePyblAmt",
                                label: "DuePayableAmount",
                                type: "Amount",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                hasCcyAttr: true,
                              },
                              {
                                tag: "DscntApldAmt",
                                label: "DiscountAppliedAmount",
                                type: "Amount",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                hasCcyAttr: true,
                              },
                              {
                                tag: "CdtNoteAmt",
                                label: "CreditNoteAmount",
                                type: "Amount",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                hasCcyAttr: true,
                              },
                              {
                                tag: "TaxAmt",
                                label: "TaxAmount",
                                type: "Amount",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                hasCcyAttr: true,
                              },
                              {
                                tag: "AdjstmntAmtAndRsn",
                                label: "AdjustmentAmountAndReason",
                                mult: "0..n",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                children: [
                                  {
                                    tag: "Amt",
                                    label: "Amount",
                                    type: "Amount",
                                    mult: "1..1",
                                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                    hasCcyAttr: true,
                                  },
                                  {
                                    tag: "CdtDbtInd",
                                    label: "CreditDebitIndicator",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                  },
                                  {
                                    tag: "Rsn",
                                    label: "Reason",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "AddtlInf",
                                    label: "AdditionalInformation",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                ]
                              },
                              {
                                tag: "RmtdAmt",
                                label: "RemittedAmount",
                                type: "Amount",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                hasCcyAttr: true,
                              },
                            ]
                          },
                          {
                            tag: "CdtrRefInf",
                            label: "CreditorReferenceInformation",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            rules: "For remittance creditor reference information, in instances where the CreditorReferenceType Code is SCOR (Structured Communication Reference) and the CreditorReference is structured in accordance with",
                            children: [
                              {
                                tag: "Tp",
                                label: "Type",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                children: [
                                  {
                                    tag: "CdOrPrtry",
                                    label: "CodeOrProprietary",
                                    mult: "1..1",
                                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                    children: [
                                      {
                                        tag: "Cd",
                                        label: "Code",
                                        type: "Code",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                        orField: "{Or",
                                      },
                                      {
                                        tag: "Prtry",
                                        label: "Proprietary",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                        orField: "Or}",
                                      },
                                    ]
                                  },
                                  {
                                    tag: "Issr",
                                    label: "Issuer",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                ]
                              },
                              {
                                tag: "Ref",
                                label: "Reference",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                            ]
                          },
                          {
                            tag: "Invcr",
                            label: "Invoicer",
                            type: "+",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "Nm",
                                label: "Name",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "PstlAdr",
                                label: "PostalAddress",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                children: [
                                  {
                                    tag: "AdrTp",
                                    label: "AddressType",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "Dept",
                                    label: "Department",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "SubDept",
                                    label: "SubDepartment",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "StrtNm",
                                    label: "StreetName",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "BldgNb",
                                    label: "BuildingNumber",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "PstCd",
                                    label: "PostCode",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "TwnNm",
                                    label: "TownName",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "CtrySubDvsn",
                                    label: "CountrySubDivision",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "Ctry",
                                    label: "Country",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "AdrLine",
                                    label: "AddressLine",
                                    type: "Text",
                                    mult: "0..7",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                ]
                              },
                              {
                                tag: "Id",
                                label: "Identification",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                children: [
                                  {
                                    tag: "OrgId",
                                    label: "OrganisationIdentification",
                                    mult: "1..1",
                                    usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                    orField: "{Or",
                                    children: [
                                      {
                                        tag: "BICOrBEI",
                                        label: "BICOrBEI",
                                        type: "Identifier",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                      },
                                      {
                                        tag: "Othr",
                                        label: "Other",
                                        mult: "0..n",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                        children: [
                                          {
                                            tag: "Id",
                                            label: "Identification",
                                            type: "Text",
                                            mult: "1..1",
                                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                          },
                                          {
                                            tag: "SchmeNm",
                                            label: "SchemeName",
                                            mult: "0..1",
                                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                            children: [
                                              {
                                                tag: "Cd",
                                                label: "Code",
                                                type: "Code",
                                                mult: "1..1",
                                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                                orField: "{{Or",
                                              },
                                              {
                                                tag: "Prtry",
                                                label: "Proprietary",
                                                type: "Text",
                                                mult: "1..1",
                                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                                orField: "Or}}",
                                              },
                                            ]
                                          },
                                          {
                                            tag: "Issr",
                                            label: "Issuer",
                                            type: "Text",
                                            mult: "0..1",
                                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                          },
                                        ]
                                      },
                                    ]
                                  },
                                  {
                                    tag: "PrvtId",
                                    label: "PrivateIdentification",
                                    mult: "1..1",
                                    usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                    orField: "Or}",
                                    children: [
                                      {
                                        tag: "DtAndPlcOfBirth",
                                        label: "DateAndPlaceOfBirth",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                        children: [
                                          {
                                            tag: "BirthDt",
                                            label: "BirthDate",
                                            type: "DateTime",
                                            mult: "1..1",
                                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                          },
                                          {
                                            tag: "PrvcOfBirth",
                                            label: "ProvinceOfBirth",
                                            type: "Text",
                                            mult: "0..1",
                                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                          },
                                          {
                                            tag: "CityOfBirth",
                                            label: "CityOfBirth",
                                            type: "Text",
                                            mult: "1..1",
                                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                          },
                                          {
                                            tag: "CtryOfBirth",
                                            label: "CountryOfBirth",
                                            type: "Code",
                                            mult: "1..1",
                                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                          },
                                        ]
                                      },
                                      {
                                        tag: "Othr",
                                        label: "Other",
                                        mult: "0..n",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                        children: [
                                          {
                                            tag: "Id",
                                            label: "Identification",
                                            type: "Text",
                                            mult: "1..1",
                                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                          },
                                          {
                                            tag: "SchmeNm",
                                            label: "SchemeName",
                                            mult: "0..1",
                                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                            children: [
                                              {
                                                tag: "Cd",
                                                label: "Code",
                                                type: "Code",
                                                mult: "1..1",
                                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                                orField: "{{Or",
                                              },
                                              {
                                                tag: "Prtry",
                                                label: "Proprietary",
                                                type: "Text",
                                                mult: "1..1",
                                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                                orField: "Or}}",
                                              },
                                            ]
                                          },
                                          {
                                            tag: "Issr",
                                            label: "Issuer",
                                            type: "Text",
                                            mult: "0..1",
                                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                          },
                                        ]
                                      },
                                    ]
                                  },
                                ]
                              },
                              {
                                tag: "CtryOfRes",
                                label: "CountryOfResidence",
                                type: "Code",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "CtctDtls",
                                label: "ContactDetails",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                children: [
                                  {
                                    tag: "NmPrfx",
                                    label: "NamePrefix",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "Nm",
                                    label: "Name",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "PhneNb",
                                    label: "PhoneNumber",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "MobNb",
                                    label: "MobileNumber",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "FaxNb",
                                    label: "FaxNumber",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "EmailAdr",
                                    label: "EmailAddress",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "Othr",
                                    label: "Other",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                ]
                              },
                            ]
                          },
                          {
                            tag: "Invcee",
                            label: "Invoicee",
                            type: "+",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "Nm",
                                label: "Name",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "PstlAdr",
                                label: "PostalAddress",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                children: [
                                  {
                                    tag: "AdrTp",
                                    label: "AddressType",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "Dept",
                                    label: "Department",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "SubDept",
                                    label: "SubDepartment",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "StrtNm",
                                    label: "StreetName",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "BldgNb",
                                    label: "BuildingNumber",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "PstCd",
                                    label: "PostCode",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "TwnNm",
                                    label: "TownName",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "CtrySubDvsn",
                                    label: "CountrySubDivision",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "Ctry",
                                    label: "Country",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "AdrLine",
                                    label: "AddressLine",
                                    type: "Text",
                                    mult: "0..7",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                ]
                              },
                              {
                                tag: "Id",
                                label: "Identification",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                children: [
                                  {
                                    tag: "OrgId",
                                    label: "OrganisationIdentification",
                                    mult: "1..1",
                                    usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                    orField: "{Or",
                                    children: [
                                      {
                                        tag: "BICOrBEI",
                                        label: "BICOrBEI",
                                        type: "Identifier",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                      },
                                      {
                                        tag: "Othr",
                                        label: "Other",
                                        mult: "0..n",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                        children: [
                                          {
                                            tag: "Id",
                                            label: "Identification",
                                            type: "Text",
                                            mult: "1..1",
                                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                          },
                                          {
                                            tag: "SchmeNm",
                                            label: "SchemeName",
                                            mult: "0..1",
                                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                            children: [
                                              {
                                                tag: "Cd",
                                                label: "Code",
                                                type: "Code",
                                                mult: "1..1",
                                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                                orField: "{{Or",
                                              },
                                              {
                                                tag: "Prtry",
                                                label: "Proprietary",
                                                type: "Text",
                                                mult: "1..1",
                                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                                orField: "Or}}",
                                              },
                                            ]
                                          },
                                          {
                                            tag: "Issr",
                                            label: "Issuer",
                                            type: "Text",
                                            mult: "0..1",
                                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                          },
                                        ]
                                      },
                                    ]
                                  },
                                  {
                                    tag: "PrvtId",
                                    label: "PrivateIdentification",
                                    mult: "1..1",
                                    usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                    orField: "Or}",
                                    children: [
                                      {
                                        tag: "DtAndPlcOfBirth",
                                        label: "DateAndPlaceOfBirth",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                        children: [
                                          {
                                            tag: "BirthDt",
                                            label: "BirthDate",
                                            type: "DateTime",
                                            mult: "1..1",
                                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                          },
                                          {
                                            tag: "PrvcOfBirth",
                                            label: "ProvinceOfBirth",
                                            type: "Text",
                                            mult: "0..1",
                                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                          },
                                          {
                                            tag: "CityOfBirth",
                                            label: "CityOfBirth",
                                            type: "Text",
                                            mult: "1..1",
                                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                          },
                                          {
                                            tag: "CtryOfBirth",
                                            label: "CountryOfBirth",
                                            type: "Code",
                                            mult: "1..1",
                                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                          },
                                        ]
                                      },
                                      {
                                        tag: "Othr",
                                        label: "Other",
                                        mult: "0..n",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                        children: [
                                          {
                                            tag: "Id",
                                            label: "Identification",
                                            type: "Text",
                                            mult: "1..1",
                                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                          },
                                          {
                                            tag: "SchmeNm",
                                            label: "SchemeName",
                                            mult: "0..1",
                                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                            children: [
                                              {
                                                tag: "Cd",
                                                label: "Code",
                                                type: "Code",
                                                mult: "1..1",
                                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                                orField: "{{Or",
                                              },
                                              {
                                                tag: "Prtry",
                                                label: "Proprietary",
                                                type: "Text",
                                                mult: "1..1",
                                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                                orField: "Or}}",
                                              },
                                            ]
                                          },
                                          {
                                            tag: "Issr",
                                            label: "Issuer",
                                            type: "Text",
                                            mult: "0..1",
                                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                          },
                                        ]
                                      },
                                    ]
                                  },
                                ]
                              },
                              {
                                tag: "CtryOfRes",
                                label: "CountryOfResidence",
                                type: "Code",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "CtctDtls",
                                label: "ContactDetails",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                children: [
                                  {
                                    tag: "NmPrfx",
                                    label: "NamePrefix",
                                    type: "Code",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "Nm",
                                    label: "Name",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "PhneNb",
                                    label: "PhoneNumber",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "MobNb",
                                    label: "MobileNumber",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "FaxNb",
                                    label: "FaxNumber",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "EmailAdr",
                                    label: "EmailAddress",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "Othr",
                                    label: "Other",
                                    type: "Text",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                ]
                              },
                            ]
                          },
                          {
                            tag: "AddtlRmtInf",
                            label: "AdditionalRemittanceInformation",
                            type: "Text",
                            mult: "0..3",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                        ]
                      },
                    ]
                  },
                  {
                    tag: "RltdDts",
                    label: "RelatedDates",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                    rules: "EPC recommendation for SEPA transaction reporting",
                    children: [
                      {
                        tag: "AccptncDtTm",
                        label: "AcceptanceDateTime",
                        type: "DateTime",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        rules: "SEPA Additional Optional Service",
                      },
                      {
                        tag: "IntrBkSttlmDt",
                        label: "InterbankSettlementDate",
                        type: "DateTime",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        rules: "EPC recommendation for SEPA transaction reporting",
                      },
                      {
                        tag: "StartDt",
                        label: "StartDate",
                        type: "DateTime",
                        mult: "0..1",
                        usage: { ach: "NU", wire: "NU", cheques: "BD", sepa: "NU" },
                        rules: "May be used for cheque issuance date",
                      },
                      {
                        tag: "EndDt",
                        label: "EndDate",
                        type: "DateTime",
                        mult: "0..1",
                        usage: { ach: "NU", wire: "NU", cheques: "BD", sepa: "NU" },
                        rules: "May be used for cheque expiry date",
                      },
                      {
                        tag: "TxDtTm",
                        label: "TransactionDateTime",
                        type: "DateTime",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                    ]
                  },
                  {
                    tag: "Tax",
                    label: "Tax",
                    type: "+",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                    children: [
                      {
                        tag: "Cdtr",
                        label: "Creditor",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        children: [
                          {
                            tag: "TaxId",
                            label: "TaxIdentification",
                            type: "Text",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                          {
                            tag: "RegnId",
                            label: "RegistrationIdentification",
                            type: "Text",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                          {
                            tag: "TaxTp",
                            label: "TaxType",
                            type: "Text",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                        ]
                      },
                      {
                        tag: "Dbtr",
                        label: "Debtor",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        children: [
                          {
                            tag: "TaxId",
                            label: "TaxIdentification",
                            type: "Text",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                          {
                            tag: "RegnId",
                            label: "RegistrationIdentification",
                            type: "Text",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                          {
                            tag: "TaxTp",
                            label: "TaxType",
                            type: "Text",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                          {
                            tag: "Authstn",
                            label: "Authorisation",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "Titl",
                                label: "Title",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Nm",
                                label: "Name",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                            ]
                          },
                        ]
                      },
                      {
                        tag: "AdmstnZn",
                        label: "AdministrationZone",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "RefNb",
                        label: "ReferenceNumber",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "Mtd",
                        label: "Method",
                        type: "Text",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "TtlTaxblBaseAmt",
                        label: "TotalTaxableBaseAmount",
                        type: "Amount",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        hasCcyAttr: true,
                      },
                      {
                        tag: "TtlTaxAmt",
                        label: "TotalTaxAmount",
                        type: "Amount",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        hasCcyAttr: true,
                      },
                      {
                        tag: "Dt",
                        label: "Date",
                        type: "DateTime",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "SeqNb",
                        label: "SequenceNumber",
                        type: "Quantity",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                      },
                      {
                        tag: "Rcrd",
                        label: "Record",
                        mult: "0..n",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        children: [
                          {
                            tag: "Tp",
                            label: "Type",
                            type: "Text",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                          {
                            tag: "Ctgy",
                            label: "Category",
                            type: "Text",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                          {
                            tag: "CtgyDtls",
                            label: "CategoryDetails",
                            type: "Text",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                          {
                            tag: "DbtrSts",
                            label: "DebtorStatus",
                            type: "Text",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                          {
                            tag: "CertId",
                            label: "CertificateIdentification",
                            type: "Text",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                          {
                            tag: "FrmsCd",
                            label: "FormsCode",
                            type: "Text",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                          {
                            tag: "Prd",
                            label: "Period",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "Yr",
                                label: "Year",
                                type: "DateTime",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Tp",
                                label: "Type",
                                type: "Code",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "FrToDt",
                                label: "FromToDate",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                children: [
                                  {
                                    tag: "FrDt",
                                    label: "FromDate",
                                    type: "DateTime",
                                    mult: "1..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "ToDt",
                                    label: "ToDate",
                                    type: "DateTime",
                                    mult: "1..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                ]
                              },
                            ]
                          },
                          {
                            tag: "TaxAmt",
                            label: "TaxAmount",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "Rate",
                                label: "Rate",
                                type: "Rate",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "TaxblBaseAmt",
                                label: "TaxableBaseAmount",
                                type: "Amount",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                hasCcyAttr: true,
                              },
                              {
                                tag: "TtlAmt",
                                label: "TotalAmount",
                                type: "Amount",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                hasCcyAttr: true,
                              },
                              {
                                tag: "Dtls",
                                label: "Details",
                                mult: "0..n",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                children: [
                                  {
                                    tag: "Prd",
                                    label: "Period",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                    children: [
                                      {
                                        tag: "Yr",
                                        label: "Year",
                                        type: "DateTime",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                      },
                                      {
                                        tag: "Tp",
                                        label: "Type",
                                        type: "Code",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                      },
                                      {
                                        tag: "FrToDt",
                                        label: "FromToDate",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                        children: [
                                          {
                                            tag: "FrDt",
                                            label: "FromDate",
                                            type: "DateTime",
                                            mult: "1..1",
                                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                          },
                                          {
                                            tag: "ToDt",
                                            label: "ToDate",
                                            type: "DateTime",
                                            mult: "1..1",
                                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                          },
                                        ]
                                      },
                                    ]
                                  },
                                  {
                                    tag: "Amt",
                                    label: "Amount",
                                    type: "Amount",
                                    mult: "1..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                    hasCcyAttr: true,
                                  },
                                ]
                              },
                            ]
                          },
                          {
                            tag: "AddtlInf",
                            label: "AdditionalInformation",
                            type: "Text",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                        ]
                      },
                    ]
                  },
                  {
                    tag: "RtrInf",
                    label: "ReturnInformation",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                    rules: "Report when available for return items",
                    children: [
                      {
                        tag: "OrgnlBkTxCd",
                        label: "OriginalBankTransactionCode",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        rules: "Domain and/or proprietary may be provided, when available.  At least one must be provided.",
                        children: [
                          {
                            tag: "Domn",
                            label: "Domain",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "Cd",
                                label: "Code",
                                type: "Code",
                                mult: "1..1",
                                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                              },
                              {
                                tag: "Fmly",
                                label: "Family",
                                mult: "1..1",
                                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                children: [
                                  {
                                    tag: "Cd",
                                    label: "Code",
                                    type: "Code",
                                    mult: "1..1",
                                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                  },
                                  {
                                    tag: "SubFmlyCd",
                                    label: "SubFamilyCode",
                                    type: "Code",
                                    mult: "1..1",
                                    usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                  },
                                ]
                              },
                            ]
                          },
                          {
                            tag: "Prtry",
                            label: "Proprietary",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "Cd",
                                label: "Code",
                                type: "Text",
                                mult: "1..1",
                                usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                              },
                              {
                                tag: "Issr",
                                label: "Issuer",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                            ]
                          },
                        ]
                      },
                      {
                        tag: "Orgtr",
                        label: "Originator",
                        type: "+",
                        mult: "0..1",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        children: [
                          {
                            tag: "Nm",
                            label: "Name",
                            type: "Text",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                          },
                          {
                            tag: "PstlAdr",
                            label: "PostalAddress",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "AdrTp",
                                label: "AddressType",
                                type: "Code",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Dept",
                                label: "Department",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "SubDept",
                                label: "SubDepartment",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "StrtNm",
                                label: "StreetName",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "BldgNb",
                                label: "BuildingNumber",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "PstCd",
                                label: "PostCode",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "TwnNm",
                                label: "TownName",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "CtrySubDvsn",
                                label: "CountrySubDivision",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Ctry",
                                label: "Country",
                                type: "Code",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "AdrLine",
                                label: "AddressLine",
                                type: "Text",
                                mult: "0..7",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                            ]
                          },
                          {
                            tag: "Id",
                            label: "Identification",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "OrgId",
                                label: "OrganisationIdentification",
                                mult: "1..1",
                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                orField: "{Or",
                                children: [
                                  {
                                    tag: "BICOrBEI",
                                    label: "BICOrBEI",
                                    type: "Identifier",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                  },
                                  {
                                    tag: "Othr",
                                    label: "Other",
                                    mult: "0..n",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                    children: [
                                      {
                                        tag: "Id",
                                        label: "Identification",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                      },
                                      {
                                        tag: "SchmeNm",
                                        label: "SchemeName",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                        children: [
                                          {
                                            tag: "Cd",
                                            label: "Code",
                                            type: "Code",
                                            mult: "1..1",
                                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                            orField: "{{Or",
                                          },
                                          {
                                            tag: "Prtry",
                                            label: "Proprietary",
                                            type: "Text",
                                            mult: "1..1",
                                            usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                            orField: "Or}}",
                                          },
                                        ]
                                      },
                                      {
                                        tag: "Issr",
                                        label: "Issuer",
                                        type: "Text",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                      },
                                    ]
                                  },
                                ]
                              },
                              {
                                tag: "PrvtId",
                                label: "PrivateIdentification",
                                mult: "1..1",
                                usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                orField: "Or}",
                                children: [
                                  {
                                    tag: "DtAndPlcOfBirth",
                                    label: "DateAndPlaceOfBirth",
                                    mult: "0..1",
                                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                    children: [
                                      {
                                        tag: "BirthDt",
                                        label: "BirthDate",
                                        type: "DateTime",
                                        mult: "1..1",
                                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                      },
                                      {
                                        tag: "PrvcOfBirth",
                                        label: "ProvinceOfBirth",
                                        type: "Text",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                      },
                                      {
                                        tag: "CityOfBirth",
                                        label: "CityOfBirth",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                      },
                                      {
                                        tag: "CtryOfBirth",
                                        label: "CountryOfBirth",
                                        type: "Code",
                                        mult: "1..1",
                                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                      },
                                      {
                                        tag: "Othr",
                                        label: "Other",
                                        mult: "0..n",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                      },
                                      {
                                        tag: "Id",
                                        label: "Identification",
                                        type: "Text",
                                        mult: "1..1",
                                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                                      },
                                      {
                                        tag: "SchmeNm",
                                        label: "SchemeName",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                        children: [
                                          {
                                            tag: "Cd",
                                            label: "Code",
                                            type: "Code",
                                            mult: "1..1",
                                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                            orField: "{{Or",
                                          },
                                          {
                                            tag: "Prtry",
                                            label: "Proprietary",
                                            type: "Text",
                                            mult: "1..1",
                                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                                            orField: "Or}}",
                                          },
                                        ]
                                      },
                                      {
                                        tag: "Issr",
                                        label: "Issuer",
                                        type: "Text",
                                        mult: "0..1",
                                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                                      },
                                    ]
                                  },
                                ]
                              },
                            ]
                          },
                          {
                            tag: "CtryOfRes",
                            label: "CountryOfResidence",
                            type: "Code",
                            mult: "0..1",
                            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                            children: [
                              {
                                tag: "CtctDtls",
                                label: "ContactDetails",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "NmPrfx",
                                label: "NamePrefix",
                                type: "Code",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Nm",
                                label: "Name",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "PhneNb",
                                label: "PhoneNumber",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "MobNb",
                                label: "MobileNumber",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "FaxNb",
                                label: "FaxNumber",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "EmailAdr",
                                label: "EmailAddress",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                              {
                                tag: "Othr",
                                label: "Other",
                                type: "Text",
                                mult: "0..1",
                                usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                              },
                            ]
                          },
                        ]
                      },
                      {
                        tag: "Rsn",
                        label: "Reason",
                        mult: "0..1",
                        usage: { ach: "R", wire: "R", cheques: "R", sepa: "R" },
                        rules: "Specifies Reason for Return",
                        children: [
                          {
                            tag: "Cd",
                            label: "Code",
                            type: "Code",
                            mult: "1..1",
                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                            orField: "{Or",
                          },
                          {
                            tag: "Prtry",
                            label: "Proprietary",
                            type: "Text",
                            mult: "1..1",
                            usage: { ach: "XOR", wire: "XOR", cheques: "XOR", sepa: "XOR" },
                            orField: "Or}",
                          },
                        ]
                      },
                      {
                        tag: "AddtlInf",
                        label: "AdditionalInformation",
                        type: "Text",
                        mult: "0..n",
                        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                        rules: "Additional information  to describe the return transaction",
                      },
                    ]
                  },
                  {
                    tag: "AddtlTxInf",
                    label: "AdditionalTransactionInformation",
                    type: "Text",
                    mult: "0..1",
                    usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
                  },
                ]
              },
            ]
          },
          {
            tag: "AddtlNtryInf",
            label: "AdditionalEntryInformation",
            type: "Text",
            mult: "0..1",
            usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
          },
        ]
      },
      {
        tag: "AddtlStmtInf",
        label: "AdditionalStatementInformation",
        type: "Text",
        mult: "0..1",
        usage: { ach: "BD", wire: "BD", cheques: "BD", sepa: "BD" },
      },
    ]
  },
];