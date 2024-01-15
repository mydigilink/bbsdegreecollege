exports.getIndexPage = (req, resp) => {
    resp.render('index');
};

exports.getAboutPage = (req,resp)=>{
    resp.render('about-us');
}

exports.getSignupPage = (req,resp)=>{
    resp.render('signup');
}

exports.getContactPage = (req,resp)=>{
    resp.render('contact');
}

exports.getBaPage = (req,resp)=>{
    resp.render('bachelor-of-art');
}

exports.getBcomPage = (req,resp)=>{
    resp.render('bachelor-of-commerce');
}

exports.getGalleryPage = (req,resp)=>{
    resp.render('gallery');
}

exports.getBlogPage = (req,resp)=>{
    resp.render('blog');
}

exports.getBlogdetailsPage = (req,resp)=>{
    resp.render('blog-details');
}

exports.getFacilitiesPage = (req,resp)=>{
    resp.render('our-facilities');
}

exports.getPlacementPage = (req,resp)=>{
    resp.render('placement-and-internship');
}