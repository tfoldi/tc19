var express = require('express');
const Pool = require('pg').Pool
var app = express();

app.use(express.json());
app.get('/', function (req, res) {
  console.log(req);
  res.send('Hello World3!');

});

app.post('/auth', async function (request, res) {

  var body = request.body;
  const pool = new Pool({
    user: 'readonly',
    host: 'tamas.starschema.com',
    database: 'workgroup',
    password: '6f87ad7558a94e6d45df6d94b8db23a4',
    port: 8060,
  });
  try {
    var qry = await pool.query(`SELECT * FROM public.sessions WHERE session_id = '${body.wg_session_id}' AND user_id='${body.id}'`);
    if (qry.rowCount == 0) {
      respond(res, false);
      return;
    }
    for (var row = 0; row < qry.rows.length; row++) {
      var vqldata = JSON.parse(qry.rows[row].shared_vizql_write);
      if (!vqldata.googleTabs || !vqldata.googleTabs[body.session_key]){
        respond(res, false);
        return;
      }
      if (vqldata.googleTabs[body.session_key] == body.sessionId){
        respond(res, true);
        return;
      }
      
    }
    respond(res, false);
  }
  catch (e) {
    respond(res, false, e);
    console.log("failed", e)
  }

  pool.end();


});

function respond(res, valid, ex = null) {
  var ret = {
    valid: valid
  };
  if (ex) {
    ret.ex = ex;
  }
  res.send(ret);
}

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});