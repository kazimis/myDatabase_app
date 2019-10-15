const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var bodyParser = require('body-parser');
var app = express();

  app.use(express.static(path.join(__dirname, 'pages')));
  app.use(express.json());
  app.use(express.urlencoded({extended : true}));
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.get('/', (req, res) => res.render('pages/index'));

  //get database home page
  app.get('/myDataBase',(req,res)=> {
    console.log("no");
    var getUidNameQuerry = `select uid,name from tokimon`;
      pool.query(getUidNameQuerry,(err,result)=>{
        if(err)
          res.end(err)
        var r = { 'r': (result) ? result.rows : null};
        res.render('pages/myDataBase', r );
      //client.release();
    })
    });

  //get addData page
  app.get('/addData',(req,res)=>{res.render('pages/addData');
  });

  app.get('/update',(req,res)=>{res.render('pages/update');
  });

  app.get('/readAll',(req,res)=> {

    var get_all_data = `SELECT * from tokimon`;
      pool.query(get_all_data,(err,result)=>{
        if(err)
          res.end(err)
        var results = { 'results': (result) ? result.rows : null};
        res.render('pages/readAll', results );

    })
    });

  app.get('/:id',(req,res) =>{
    var id = req.params.id;

    if(id.includes("del")){
      var tmp = id.substr(3,id.length-1);

      var deleteData_byID = `Delete from tokimon where uid = ${tmp}`;
      pool.query(deleteData_byID, (err)=>{
        if (err)
          res.send(err);

        });
        var msg = "This data is deleted!";
        res.render("pages/dataInfo", {'message':msg});

    }else if(id.includes("update")){
      var tmp = id.substr(6,id.length-1);
      console.log(tmp);
      var update_byID = `SELECT * FROM tokimon where uid = ${tmp}`;
      pool.query(update_byID, (err,result)=>{

        if (err)
          res.send(err)
        var results = { 'results': (result) ? result.rows : null};
        console.log(results);
        res.render('pages/update', results );
      });

    }else{
      var getDataById = `SELECT * FROM tokimon where uid = ${id}`;

        pool.query(getDataById, (err,result)=>{

          if (err)
            res.send(err)
          var results = { 'results': (result) ? result.rows : null};
          res.render('pages/dataInfo', results );

        })
    }
    });
  //after post HTML form
  app.post("/:id",(req, res) => {
    var myTotal = 0;
    var id = req.params.id;
    var myForm = req.body;
    var myForm_length = Object.keys(myForm).length;
    for(var i = 2; i < myForm_length-1; i++){
      myTotal+= parseInt(myForm[i],10);
    }
    if(id.includes("update")){
      var tmp = id.substr(6,id.length-1);

      var updateQuerry = `update tokimon SET name = '${myForm[1]}',weight = '${myForm[2]}',
      height = '${myForm[3]}',fly = '${myForm[4]}',fight = '${myForm[5]}',fire = '${myForm[6]}'
      ,water = '${myForm[7]}',electric = '${myForm[8]}',frozen = '${myForm[9]}'
      ,total =  ${myTotal} ,trainer_name = '${myForm[10]}' where uid = ${tmp}`;
      pool.query(updateQuerry,(error)=>{
        if (error){
          res.send(error);
        }
        res.render('pages/dataInfo');
      });

    }
    else if(id == "add"){
      console.log(myTotal);
      var userIn = `insert into tokimon (name,weight,height,fly,fight,fire,
      water,electric,frozen,total,Trainer_Name)
      Values('${myForm[1]}','${myForm[2]}','${myForm[3]}','${myForm[4]}',
      '${myForm[5]}','${myForm[6]}','${myForm[7]}','${myForm[8]}',
      '${myForm[9]}',${myTotal},'${myForm[10]}')`;
      console.log(myForm[2]);
      pool.query(userIn,(error)=>{
        if (error){
          res.send(error);
        }
        res.redirect('/myDataBase');
      });
    }

    });


  app.get('/times', (req, res) => res.send(showTimes()));

  //for testing purpose
  app.get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT Name FROM tokimon;');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  });

  app.listen(PORT, () => console.log(`Listening on ${ PORT }`));


  showTimes = () => {
  let result = ''
  const times = process.env.TIMES || 5
  for (i = 0; i < times; i++) {
    result += i + ' '
  }
  return result;
}
