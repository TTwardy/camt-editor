// Pre-filled sample data for SEPA payment type
// Provides a valid starting point for generating camt.053 XML files

export function getSampleData() {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);
  const dateTimeStr = now.toISOString().slice(0, 19);
  
  return {
    // Group Header
    'GrpHdr.MsgId': `MSG-${dateStr.replace(/-/g, '')}-001`,
    'GrpHdr.CreDtTm': dateTimeStr,
    
    // Statement
    'Stmt.Id': `STMT-${dateStr.replace(/-/g, '')}-001`,
    'Stmt.ElctrncSeqNb': '1',
    'Stmt.CreDtTm': dateTimeStr,
    
    // Account
    'Stmt.Acct.Id.IBAN': 'DE89370400440532013000',
    'Stmt.Acct.Ccy': 'EUR',
    'Stmt.Acct.Svcr.FinInstnId.BIC': 'COBADEFFXXX',
    
    // Balance - Opening Booked
    'Stmt.Bal.Tp.CdOrPrtry.Cd': 'OPBD',
    'Stmt.Bal.Amt': '15000.00',
    'Stmt.Bal.Amt_Ccy': 'EUR',
    'Stmt.Bal.CdtDbtInd': 'CRDT',
    'Stmt.Bal.Dt.Dt': dateStr,
    
    // Entry
    'Stmt.Ntry.NtryRef': 'ENTRY-001',
    'Stmt.Ntry.Amt': '250.00',
    'Stmt.Ntry.Amt_Ccy': 'EUR',
    'Stmt.Ntry.CdtDbtInd': 'DBIT',
    'Stmt.Ntry.Sts': 'BOOK',
    'Stmt.Ntry.BookgDt.Dt': dateStr,
    'Stmt.Ntry.ValDt.Dt': dateStr,
    'Stmt.Ntry.BkTxCd.Domn.Cd': 'PMNT',
    'Stmt.Ntry.BkTxCd.Domn.Fmly.Cd': 'ICDT',
    'Stmt.Ntry.BkTxCd.Domn.Fmly.SubFmlyCd': 'ESCT',
    
    // Entry Details > Transaction Details > References
    'Stmt.Ntry.NtryDtls.TxDtls.Refs.EndToEndId': 'E2E-20260329-001',
    'Stmt.Ntry.NtryDtls.TxDtls.Refs.MndtId': 'MNDT-2026-001',
    
    // Transaction Amount
    'Stmt.Ntry.NtryDtls.TxDtls.AmtDtls.TxAmt.Amt': '250.00',
    'Stmt.Ntry.NtryDtls.TxDtls.AmtDtls.TxAmt.Amt_Ccy': 'EUR',
    
    // Related Parties - Debtor
    'Stmt.Ntry.NtryDtls.TxDtls.RltdPties.Dbtr.Nm': 'John Doe GmbH',
    'Stmt.Ntry.NtryDtls.TxDtls.RltdPties.DbtrAcct.Id.IBAN': 'DE89370400440532013000',
    
    // Related Parties - Creditor
    'Stmt.Ntry.NtryDtls.TxDtls.RltdPties.Cdtr.Nm': 'Acme Corp Ltd',
    'Stmt.Ntry.NtryDtls.TxDtls.RltdPties.CdtrAcct.Id.IBAN': 'FR7630006000011234567890189',
    
    // Related Agents
    'Stmt.Ntry.NtryDtls.TxDtls.RltdAgts.DbtrAgt.FinInstnId.BIC': 'COBADEFFXXX',
    'Stmt.Ntry.NtryDtls.TxDtls.RltdAgts.CdtrAgt.FinInstnId.BIC': 'BNPAFRPPXXX',
    
    // Remittance Info
    'Stmt.Ntry.NtryDtls.TxDtls.RmtInf.Ustrd': 'Invoice 2026-0042 Payment',
  };
}
