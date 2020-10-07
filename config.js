module.exports = { 
    DATABASE_URL : process.env.DATABASE_URL || "mongodb+srv://dbAdmin:dbAdminPassword@cluster0.suywl.mongodb.net/saludbienestar?retryWrites=true&w=majority",
    PORT : process.env.PORT || 8080,
    SECRET_TOKEN : process.env.SECRET_TOKEN || 'secret'
};