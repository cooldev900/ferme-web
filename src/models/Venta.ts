import { DetalleVenta } from './DetalleVenta';

export class Venta {
    public idVenta: number;
    public tipoVenta: string
    public fechaVenta: string
    public subtotalVenta: number
    public detallesVenta: DetalleVenta[];
    public idEmpleado: number;
    public idCliente: number;
}