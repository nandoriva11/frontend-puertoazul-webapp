import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(
    private httpClient: HttpClient,
    private datePipe: DatePipe

  ) { }


  private transformToDate(date: Date): any {
    return this, this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  /* openPDF(docDefinition: any) {
    let pdf = 
    
  } */

}
