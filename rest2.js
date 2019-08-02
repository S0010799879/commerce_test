
var Request = require("request-promise");
var xml2json = require("xml2js");

var fs = require ("fs");
var username = 'admin'
var password = 'J&)zs{7;wgkV5L=et+&68t{~8' 
                
var options = {
  method : 'GET',
  auth: {
    user: username,
    password: password
  },
  uri:"https://backoffice.ct075nck5-franketec1-p1-public.model-t.cc.commerce.ondemand.com/odata2webservices/InboundFrankeProductThumbnail/Products?$filter=catalogVersion/integrationKey%20eq%20%27Staged%7CDefault%27&skip=10&$top=10&$expand=thumbnail",
  headers:{

  }
}


async function commercePic(options){


const result = await   Request.get(options, (error, response, body) => {
     if(error) {
        return console.dir(error);
    }
    else
      return body
  }
)
return result 
}



async function analyse(body){



  
   // fs.writeFileSync('resp.xml',body)
    xml2json(body,function(err,result){
       // console.dir(result)
       const res = JSON.stringify(result);
      // console.log(JSON.parse(res).feed.entry[3].link[1].$)
       let a = JSON.parse(res).feed.entry
        console.dir(a.length)
       fs.writeFileSync('resp.json',JSON.stringify(result))
       fs.unlink('commercePic.txt',function (err){
          
       })  
       fs.unlink('commercenoPic.txt',function(err){

       })  
       fs.unlink('cppic.cmd',function(err){
         
      }) 
        
      a.forEach(function (element){
                  
        try {
        var s =  element.link[1].$.href
        console.log(s)
        fun=s.match(/(([\d]{3})\.([\d]{4})\.([\d]{3}))/)[0]
       
        var bildDa = element.link[1]["m:inline"][0].entry
       
         console.log(fun + ' wird bearbeitet')
          if (bildDa){
             fs.appendFileSync('commercePic.txt',  fun + " ist vorhanden\n" ,function (err){
 

            }) 
             
          }else{
            fs.appendFileSync('commercenoPic.txt',fun + "; ist nicht vorhanden\n",function (err){
   

            })  
            fs.appendFileSync('cppic.cmd','copy D:\\B2B\\SCC\\Bild1\\' + fun.replace('.','').replace('.','') + '.jpg  D:\\B2B\\SCC\\hotfolder >> log.txt\n',function (err){
            })  
          }
       }
       catch  ( e) {
        // console.log(e.message)
       }
    }
      )
      
      // forEach
    // console.dir((body));
  })
};


async function main (){
   let body = await commercePic(options)
   fs.writeFileSync('resp.xml',body)
    await analyse(body)
}
main()