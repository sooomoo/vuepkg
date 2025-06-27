import * as msgpack from "@msgpack/msgpack";

export interface Marshaler {
    marshal<T = unknown>(obj: T): Uint8Array;
    unmarshal<T = unknown>(data: Uint8Array): T;
}

class MsgPackMarshaler implements Marshaler {
    marshal<T = unknown>(obj: T): Uint8Array {
        return msgpack.encode(obj);
    }
    unmarshal<T = unknown>(data: Uint8Array): T {
        return msgpack.decode(data) as T;
    }
}
 
export const msgPackMarshaler = new MsgPackMarshaler();
