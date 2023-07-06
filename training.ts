import express from 'express';
const app = express();
app.use(express.json());

app.post('/calc', function (req, res) {
  let result = 0;

  for (const mov of req.body) {

    mov.ds = new Date(mov.ds);

    if (mov.dist != null && mov.dist != undefined && typeof mov.dist === 'number' && mov.dist > 0) {

      if (mov.ds != null && mov.ds != undefined && mov.ds instanceof Date && mov.ds.toString() !== 'Invalid Date') {

        // overnight

        if (mov.ds.getHours() > 22 || mov.ds.getHours() <= 6) {

          // not sunday
          if (mov.ds.getDay() !== 0) {

            result += mov.dist * 3.90;
            //sunday
          } else {
            result += mov.dist * 5;
          }
        } else {
          // sunday
          if (mov.ds.getDay() === 0) {
            result += mov.dist * 2.9;
          } else {
            result += mov.dist * 2.10;
          }
        }
      } else {
        // console.log(d);
        res.json({ result: -2 });
        return
      }
    } else {
      res.json({ result: -1 });
      return
    }
    if (result < 10)
      result = 10
    
    res.json(result);
    return;
  }
});

app.listen(3000);
