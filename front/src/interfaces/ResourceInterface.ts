export default interface ResourceInterface {
  reservas: {
    periodo: string;
    data: any;
    recursoId: string | number;
    recursoType: string;
    reservado: boolean;
    sala: any;
    professor?: string;
  }[];
}
