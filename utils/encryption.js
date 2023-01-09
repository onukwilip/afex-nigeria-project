import crypto from "crypto";
export default class Manager {
  constructor({ key: t, vector: r }) {
    (this.encrypt = (e) => do_encrypt_data(e, t, r)),
      (this.decrypt = (e) => do_decrypt_data(e, t, r));
  }
}
function do_encrypt_data(t, r, e) {
  function a(t) {
    let a = crypto.createCipheriv("aes-256-cbc", r, e);
    return Buffer.concat([a.update(t), a.final()]).toString("base64");
  }
  if (Array.isArray(t))
    t.forEach((r, e) => {
      t[e] = do_encrypt_data(r);
    });
  else if ("object" == typeof t)
    for (let r in t)
      t.hasOwnProperty(r) &&
        (Array.isArray(t[r])
          ? (t[r] = do_encrypt_data(t[r]))
          : "object" == typeof t[r]
          ? (t[r] = do_encrypt_data(t[r]))
          : (t[r] = a(t[r].toString())));
  else t = a(t.toString());
  return t;
}
function do_decrypt_data(t, r, e) {
  function a(t) {
    if ("string" == typeof t && 0 === t.trim().length) return t;
    try {
      let a = crypto.createDecipheriv("aes-256-cbc", r, e);
      return Buffer.concat([
        a.update(Buffer.from(t, "base64")),
        a.final(),
      ]).toString();
    } catch (r) {
      return t.toString();
    }
  }
  if (Array.isArray(t))
    t.forEach((r, e) => {
      t[e] = do_decrypt_data(r);
    });
  else if ("object" == typeof t)
    for (let r in t)
      t.hasOwnProperty(r) &&
        (Array.isArray(t[r])
          ? (t[r] = do_decrypt_data(t[r]))
          : "object" == typeof t[r]
          ? (t[r] = do_decrypt_data(t[r]))
          : (t[r] = a(t[r].toString())));
  else t = a(t.toString());
  return t;
}

export const decryptResponse1 = (messages /** @type Array */) => {
  const manager = new Manager({
    key: process.env.KEY,
    vector: process.env.VECTOR,
  });
  // const returnValue=[]

  if (!Array.isArray(messages)) return;

  for (let i = 0; i < messages.length; i++) {
    for (const key in messages[i]) {
      if (typeof messages[i][key] === "object") {
        continue;
      }

      messages[i][key] = manager.decrypt(messages[i][key]);
    }
  }

  return messages;
};

export const decryptResponse = (messages /** @type Array | Object*/) => {
  const manager = new Manager({
    key: process.env.KEY,
    vector: process.env.VECTOR,
  });

  if (Array.isArray(messages)) {
    for (let i = 0; i < messages.length; i++) {
      if (typeof messages[i] === "object" || Array.isArray(messages[i]))
        decryptResponse(messages[i]);

      if (typeof messages[i] === "string")
        messages[i] = manager.decrypt(messages[i]);
    }
  }

  if (typeof messages === "object") {
    for (const i in messages) {
      if (typeof messages[i] === "object" || Array.isArray(messages[i]))
        decryptResponse(messages[i]);

      if (typeof messages[i] === "string")
        messages[i] = manager.decrypt(messages[i]);
    }
  }

  return messages;
};
