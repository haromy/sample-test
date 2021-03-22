const fs = require('fs');
const path = require('path');
const moment = require('moment');
const { randomGenerate } = require('../helpers/generate');

const generate = async (req, res) => {
  try {
    const dt = await randomGenerate();
    if(!dt) throw new Error('Error write');
    const filename = `${moment().format('YYYY-MM-DD-HH-mm-ss-SSSS')}.txt`
    fs.writeFileSync(path.join(__dirname, '..', 'files', filename), dt);
    const data = {
      code: 200,
      message: 'ok',
      data: {
        test: true,
        filename
      }
    }
    return res.status(200).send(data);
  } catch (err) {
    return res.status(400).send({
      code: 400,
      message: err.message
    })
  }
}

module.exports = {
  generate
}