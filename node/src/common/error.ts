export class ResponseError extends Error {
  code: string;
  msg: string;
  data: { [key: string]: number | string | object | boolean | null };
  constructor( { msg="ResponseError", data={} } ) {
    super( "ResponseError" );
    this.name = "ResponseError";
    this.code = "PerfMetricsError";
    this.msg = msg;
    this.data = data;
  }
}

export const resErr = {

}
