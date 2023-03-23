class Globals {
}

class DevelopmentGlobals extends Globals {
    public urls = {
        // probably need to change the url
        coupon: "http://localhost:8080/", 
        welcome: "http://localhost:8080/"
    }
}

class ProductionGlobals extends Globals {
    public urls = {
        coupons: "www.aws.com/MohseWebSite/tasks",
        welcome: "www.aws.com/MohseWebSite/welcome/"
    }
}

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;