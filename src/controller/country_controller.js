import db from "../../prisma/connection.js"

// create country
export const create_country = async (req, res) => {
    try {
        const country = await db.countries.create({
            data: req.body
        })

        if (!country) {
            res.status(500).json({
                msg: "Something Wrong"
            })
        }

        res.status(200).json({
            data: country
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: error
        })
    }
}

// GET ALL COUNTRY 
export const get_all_countries = async (req, res) => {
    try {
        const country = await db.countries.findMany()

        return res.status(200).json({
            data: country
        })
    } catch (error) {
        return res.status(500).json({
            msg: error
        })
    }
}

// GET BY ID COUNTRY
export const get_byid = async (req, res) => {
    try {
        const { id } = req.params

        const country = await db.countries.findUnique({
            where: {
                id: id
            }
        })

        if (!country) {
            return res.status(404).json({ message: "Country not found" });
        }

        res.status(200).json({ data: country });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// UPDATE COUNTRY
export const update_country = async (req, res) => {

    try {
        const { id } = req.params

        const updatedCountry = await db.countries.update({
            where: {
                id: id
            },
            data: req.body
        })

        if (!updatedCountry) {
            return res.status(500).json({
                msg: "Resource Not Found!"
            })
        }

        res.status(200).json({
            data: updatedCountry
        })

    } catch (error) {
        console.log("ERROR : ", error)
        res.status(500).json({
            msg: error
        })
    }
}

// DELETE COUNTRY
export const delete_country = async (req, res) => {
    try {
        const { id } = req.params

        const deletedCountry = await db.countries.delete({
            where: {
                id: id
            }
        })

        if (!deletedCountry) {
            return res.status(500).json({
                msg: "Resource Not Found!"
            })
        }

        res.status(200).json({ msg: `Success Deleted Country ${deletedCountry.id}` });
    } catch (error) {
        console.log("ERROR : ", error)
        res.status(500).json({
            msg: error
        })
    }
}