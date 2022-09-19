var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");;
const enseignant = require('../models/enseignant');
const modulee = require('../models/module');
const User = require('../models/user');
const jwt = require('jsonwebtoken');



router.use(cors());
let authenticate=(req,res,next)=>{
    let token=req.header('x-access-token');
    jwt.verify(token,User.getJWTSecret(),(err,decoded)=>{
        if(err){
            res.status(401).send(err);
        }
        else{
            req.user_id=decoded._id;
            next(); 
        }

    });
}
    router.post('/read',authenticate,(req, res) => {  
        
        const nommodules= req.body.nommodules;
        const semestre = req.body.semestre;
        const periode = req.body.periode; 
        console.log(req.body);
    
        console.log(req.body);
        var x = 1;
        var n = 0;          
        var bool = 0;
        let nomenseignants=[];
       
                              
                   
                enseignant.find({
                    _userId:req.user_id
                }, (err, result) => {
        
                    if (err) {
                        console.log(err)
                    }
                 



                    
                    for (let index = 0; index < result.length; index++) {
                      
                         
                    modulee.find({}, (err1, result1) => {
       
                        if (err1) {
                            console.log(err1)
                        }
                        else{
                           // console.log(result1);
                        for (let index1 = 0; index1 < result1.length; index1++) { 
                            
                          // console.log(nommodules);
                            if ((JSON.stringify(result1[index1].nommodule) ===JSON.stringify(nommodules)) && (JSON.stringify(result[index].nomcompetence) === JSON.stringify(result1[index1].nomcompetence))  && (JSON.stringify(result[index].disponibilite) != 0 ) ){
                                nomenseignant =result[index].nomenseignant;
                               // console.log("hahahah"+nomenseignant );
                               // res.status(201).json(nomenseignant);
                                bool=bool+++1;
                                const value = periode.find(v => v.includes('P1'));
                                const value1 = periode.find(v => v.includes('P2'));  
                                if((semestre==="S1")&&(value)){
                                    console.log("P1");
                                    if(result[index].nbrcrenauxp1){
                                        nomenseignants.push(result[index]);
                                        //console.log(nomenseignants)
                                       // res.status(201).json(nomenseignants);
                                        //console.log(x);
                                       
                                        
                                      
                                    }else{
                                        if(result[index].nbrcrenauxp1==0){
                                            console.log(result[index].nomenseignant+"  non disponible")

                                        }
                                    }
                                    
                                }
                                if((semestre==="S1")&&(value1)){
                                    console.log("P2");
                                    if(result[index].nbrcrenauxp2!=0){
                                        nomenseignants.push(result[index]);
                                    }
                                  

                                }
                                if((semestre==="S2")&&(value)){
                                    console.log("P3"); 
                                    if(result[index].nbrcrenauxp3!=0){
                                        nomenseignants.push(result[index]);
                                    }

                                }
                                if((semestre==="S2")&&(value1)){
                                    console.log("P4");
                                    if(result[index].nbrcrenauxp4!=0){
                                        nomenseignants.push(result[index]);
                                    }
                                        

                                }
                            
                              
                                
                               
                                
                                

                                
                                mafonction(res,index,result,nomenseignants,index1,result1);
                               // console.log(nomenseignants);

                




                                n=n+++1;
                    






                             
                               
                            } 
                            else{
                                mafonction(res,index,result,nomenseignants,index1,result1);
                            }
                            
                            }}
                            

    
                                     
                    });
                         
                  
                     }
                      })
                     // console.log(nomenseignants);
                     
 
      } );
     function mafonction(res,index,result,nomenseignants,index1,result1){
        //console.log(index1);
        //console.log("dkhal");
       // console.log(result);
        //console.log(index);
         if((index==result.length-1)&&(index1==result1.length-1) ){
           // console.log(index);
           
           console.log(nomenseignants);  

           res.send(nomenseignants);
                     
                      
                     } 

     }











     router.put("/update",  async(req, res) => {

console.log("bingoooooooooooooooooooooooooo");


        try {
      
            const nomenseignant=req.body.nomenseignant;
            const periode=req.body.periode;
            const semestre=req.body.semestre;
      

            const value = periode.find(v => v.includes('P1'));
            const value1 = periode.find(v => v.includes('P2'));  


            if((semestre==="S1")&&(value)){

                enseignant.findOne(
                    {"nomenseignant":nomenseignant},
                   
                    
                     function( err,element){
            
            
                        if(err){
                            console.log(err);
                        }
                 
                    else{
                     
                        updatee1(element)
                        console.log(element);
                   }
                   })
            
            
            }









            
            if((semestre==="S1")&&(value1)){

                enseignant.findOne(
                    {"nomenseignant":nomenseignant},
                   
                    
                     function( err,element){
            
            
                        if(err){
                            console.log(err);
                        }
                 
                    else{
                     
                        updatee2(element)
                        console.log(element);
                   }
                   })
            
            
            }




            if((semestre==="S2")&&(value)){

                enseignant.findOne(
                    {"nomenseignant":nomenseignant},
                   
                    
                     function( err,element){
            
            
                        if(err){
                            console.log(err);
                        }
                 
                    else{
                     
                        updatee3(element)
                        console.log(element);
                   }
                   })
            
            
            }










            if((semestre==="S2")&&(value1)){

                enseignant.findOne(
                    {"nomenseignant":nomenseignant},
                   
                    
                     function( err,element){
            
            
                        if(err){
                            console.log(err);
                        }
                 
                    else{
                     
                        updatee4(element)
                        console.log(element);
                   }
                   })
            
            
            }



      
          
      
      
            console.log(updatecomposant);
            res.status(201).json(updatecomposant);
      
        } catch (error) {
            res.status(422).json(error);
        }
      })
      







      function updatee1 (element){
              
          element.nbrcrenauxp1 = element.nbrcrenauxp1- 1;
        element.save();
          
        }  
      
      


        function updatee2 (element){
              
            element.nbrcrenauxp2 = element.nbrcrenauxp2- 1;
          element.save();
            
          }  
        



          function updatee3 (element){
              
            element.nbrcrenauxp3 = element.nbrcrenauxp3- 1;
          element.save();
            
          }  
        


          
      function updatee4 (element){
              
        element.nbrcrenauxp4 = element.nbrcrenauxp4- 1;
      element.save();
        
      }  
    












     module.exports = router;