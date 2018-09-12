var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Articles = require('../../models/articles');

/* GET articles listing. */
router.get('/', function(req, res, next) {

  Articles.find({}, function(err, articles){
      if(err){
        return res.json({sucess: false, error:err});
      }
      return res.json({success: true, articles: articles});
  });
  module.exports = router;
  

});

// GET a single article
router.get('/:slug', function(req, res, next) {
  var slug = req.params.slug;

  Articles.findOne({slug: slug}, function(err, articles){
      if(err){
        return res.json({sucess: false, error:err});
      }
      return res.json({success: true, articles: articles});
  });

});

// create an article
router.post('/', function(req, res){
  Articles.create(new Articles({
    title: req.body.title
  }), function(err, article){
    if(err){
      return res.json({
        success:false, 
        error:err, 
        article:req.body});
    }
    return res.json({success:true, article: article});
  });

});

// update an article 
router.put('/', function(req, res){
  Articles.findOne({_id: req.body._id}, function(err, article){

    if(err){
      return res.json({success: false, error: err});
    }

    if(article){
      let data = req.body;
      //if data passed update it
      //if title, keywords, description, body

      let size = Object.keys(data).length;

      let i = 0;

      function save(article){
        article.save(function(err){
          if(err){
              return res.json({success:false, error: err});
          }else{
              return res.json({success: true, article: article});
          }
        });
    }
      
    // create save function
    function save(article){
        article.save(function(err){
            if(err){
                return res.json({success: false, error: err});
            }else{
                return res.json({success: true, article: article});
            }
        });
    }

    // Process a single field
    function processItem(data, key, i){
        if(typeof data[key] !== 'function'){
            article[key] = data[key];

            if((size -1) === i) {
                save(article);
            }
        }
    }

        for (var key in data){
            processItem(data, key, i++);
        }

    }

    });

});




// Delete a single article

router.delete('/:articleId', function(req, res){
  var articleId = req.params.articleId;

  Articles.remove({_id:articleId}, function(err, removed){
    if(err){
      return res.json({success: false, error:err});
    }
    return res.json({success: true, status:removed});
  });
});



module.exports = router;
