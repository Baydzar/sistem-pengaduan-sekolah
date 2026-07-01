const Kategori = require("../models/Kategori");

class KategoriController {

    async getAll(req,res){

        try{

            const data = await Kategori.find();

            res.json({
                success:true,
                data
            });

        }catch(err){

            res.status(500).json({
                success:false,
                message:err.message
            });

        }

    }

    async create(req,res){

        try{

            const kategori = await Kategori.create(req.body);

            res.status(201).json({
                success:true,
                data:kategori
            });

        }catch(err){

            res.status(500).json({
                success:false,
                message:err.message
            });

        }

    }

    async update(req,res){

        try{

            const kategori = await Kategori.findByIdAndUpdate(

                req.params.id,

                req.body,

                {new:true}

            );

            res.json({
                success:true,
                data:kategori
            });

        }catch(err){

            res.status(500).json({
                success:false,
                message:err.message
            });

        }

    }

    async delete(req,res){

        try{

            await Kategori.findByIdAndDelete(req.params.id);

            res.json({
                success:true,
                message:"Kategori berhasil dihapus"
            });

        }catch(err){

            res.status(500).json({
                success:false,
                message:err.message
            });

        }

    }

}

module.exports = new KategoriController();