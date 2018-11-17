let http = require('http');
let fs = require('fs');
let url = require('url');


let sliders = [
  'https://img.alicdn.com/simba/img/TB14Wy0rgZC2uNjSZFnSuuxZpXa.jpg',
  'https://img.alicdn.com/simba/img/TB1.cLKXxTpK1RjSZFMSuvG_VXa.jpg',
  'https://img.alicdn.com/tfs/TB1txjivHorBKNjSZFjXXc_SpXa-520-280.jpg_q90_.webp',
  'https://img.alicdn.com/tfs/TB1txjivHorBKNjSZFjXXc_SpXa-520-280.jpg_q90_.webp'
];

function read(cd){
  fs.readFile('./book.json','utf8',function(err,data){
      if(err||data.length==0){
        cd([])  //  如果有图就传个空数组
      }else{
        cd(JSON.parse(data));  // 转换成JSON对象发出去
      }
  })
};

function write(data,cd){
  fs.writeFile('./book.json',JSON.stringify(data),cd)
}
/*read(function (books){  //  book  代表所有的图书

})*/
http.createServer((req,res)=>{
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
      res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
      res.setHeader("X-Powered-By",' 3.2.1')
      if(req.method=="OPTIONS") return res.end();
      let { pathname,query } = url.parse(req.url,true);
      if(pathname == '/sliders'){
          res.setHeader('content-Type','application/json;charset=utf8')
        return res.end(JSON.stringify(sliders))
      }
      if(pathname==='/page'){
        let offset = parseInt(query.offset) || 0;
        read(function(books){
          let result = books.reverse().slice(offset,offset+5);

          let hasMore = true;
          if(books.length <= offset+5){
            hasMore = false
          }
          res.setHeader('content-Type','application/json;charset=utf8')
          res.end(JSON.stringify({hasMore,books:result}))
        })
        return;
      }
      if(pathname == '/hot'){
        setInterval(()=>{
          read(function (books){
            let hot = books.reverse().slice(0,10);
            res.end(JSON.stringify(hot))
          })
        },2000)
        return
      }

      if(pathname == '/book'){ /*增删改查*/
        let id = parseInt(query.id)
        switch (req.method) {
          case 'GET':
            if(id){
                read(function(books){
                  let book = books.find(item => item.bookId === id)
                  if(!book){}
                  res.setHeader('content-Type','application/json;charset=utf8')
                  res.end(JSON.stringify(book))
                })
            }else{
              read(function(books){
                res.end(JSON.stringify(books.reverse()))
              })
            }
            break;
          case 'POST':
            let str1 = '';
              req.on('data',chunk =>{
                str1+=chunk;
              });
              req.on('end',()=>{
                let book = JSON.parse(str1)
                read(function(books){
                  book.bookId = books.length?books[books.length-1].bookId+1:1;
                  books.push(book)
                  write(books,function(){
                    res.end(JSON.stringify(book))
                  })
                })
              });
            break;
          case 'PUT':
            if(id){
              let str = '';
              req.on('data',chunk =>{
                str+=chunk;
              });
              req.on('end',()=>{
                let book = JSON.parse(str);
                read(function(books){
                  books = books.map( item =>{
                    if(item.bookId===id){
                      return book
                    }
                    return item;
                  })
                  write(books,function(){
                    res.end(JSON.stringify(book))
                  })
                });
              })
            }
            break;
          case 'DELETE':
            read(function(books){
                books =  books.filter(item=>item.bookId !== id)
                write(books,function(){
                  res.end(JSON.stringify({}))
                })
            })
            break;
        }
        return
      }
}).listen(3000);

