// ISP - A partir do contrato da camada do Interface Adapters (Neste caso, vem do Repository)
export default interface DatabaseConnection {
  query (statement: string, params: any): Promise<any>;
  close (): Promise<void>; 
}