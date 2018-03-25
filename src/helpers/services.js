function crudOperations(model) {

    if (model === undefined)
        return {};

    const operations = {};

    operations.findAll = () => model.find();

    operations.find = (filter) => model.find(filter);
    
    operations.findOne = (filter) => model.findOne(filter);

    operations.findById = (id) => model.findById(id);

    operations.remove = (id) => model.remove({ '_id': id });

    operations.create = (data) => model.create(data);

    operations.update = (id, data) => model.findByIdAndUpdate(id, data);

    return operations;

}

module.exports = {
    crudOperations
};