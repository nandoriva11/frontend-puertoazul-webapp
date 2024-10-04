import { Component } from '@angular/core';

@Component({
  selector: 'app-prueba-pedido',
  templateUrl: './prueba-pedido.component.html',
  styleUrl: './prueba-pedido.component.css'
})
export class PruebaPedidoComponent {
  currentDate = new Date();
  items = [
    { name: 'Item 1', price: 10.00 },
    { name: 'Item 2', price: 20.00 },
    // Add more items as needed
  ];
  total = this.items.reduce((sum, item) => sum + item.price, 0);

  printReceipt(): void {
    const printContent = document.getElementById('receipt-content')?.innerHTML;
    const printWindow = window.open('', '', 'height=400,width=800');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Print Receipt</title>');
      printWindow.document.write('<style>');
      printWindow.document.write('body { font-family: Arial, sans-serif; width: 80mm; margin: 0; padding: 0; }');
      printWindow.document.write('.receipt-container { width: 80mm; }');
      printWindow.document.write('</style></head><body >');
      printWindow.document.write(printContent || '');
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  }
}
