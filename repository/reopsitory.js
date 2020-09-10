const fs = require('fs');
const  crypto = require('crypto');
module.exports= class Repository {
    constructor(fileName) {
        if (!fileName){
            throw new Error("fileName is required");
        }
        this.fileName = fileName;
        try {
            fs.accessSync(this.fileName);
        }catch (e) {
            fs.writeFileSync(this.fileName,'[]');
        }
    }

    async create(obj){
        obj.id= this.generateRandomId();
        const all =  await this.getAll();
        all.push(obj);
        await this.writeAll(all);
        return obj;
    }
    async getAll(){
        const content = await fs.promises.readFile(this.fileName,'utf-8');
        return  JSON.parse(content.toString('utf-8'));
    }

    async findById(id){
        let data = await this.getAll();
        return  data.find(record=>record.id===id);
    }
    async update(id, object){
        const records =  await this.getAll();
        const record = records.find(re=> re.id===id);
        Object.assign(record,object);
        await this.writeAll(records);
    }
    async delete(id){
        const data = await this.getAll();
        const filterRecord =data.filter(record=>record.id !==id);
        await this.writeAll(filterRecord);
    }
    async getOneBy(filters){
        const records= await this.getAll();
        for (let record of records) {
            let found = true;
            for (const key in filters) {
                if (record[key] !== filters[key]){
                    found= false;
                }
            }
            if (found){
                return  record;
            }
        }
    }
    async writeAll(records){
        await fs.promises.writeFile(this.fileName,JSON.stringify(records,null,2));
    }
    generateRandomId(){
        return crypto.randomBytes(4).toString('hex');
    }
}
