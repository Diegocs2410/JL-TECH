const messages = {};
messages.messageGeneral = (res, statuscode, status, data, message) => {
  if (!data || data === null)
    return res.status(statuscode).json({ ok: status, message });
  return res.status(statuscode).json({
    ok: status,
    message,
    data,
  });
};

module.exports = messages;
