const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async (req, res = response) => {
    const events = await Event.find().populate('user', 'name');

    return res.status(200).json({
        error: false,
        events
    });
};

const addEvents = async (req, res = response) => {
    const event = new Event(req.body);

    try {
        event.user = req.uid;
        const eventSaved = await event.save();
        return res.status(200).json({
            error: false,
            eventSaved
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            msg: 'Hable con el administrador'
        });
    }
};

const updateEvents = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento inexistente'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para editar este elemento'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        };

        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {
            new: true
        });

        res.status(200).json({
            ok: true,
            event: eventUpdated
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: false,
            msg: 'Hable con el administrador'
        });
    }
};

const deleteEvents = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento inexistente'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para eliminar este elemento'
            });
        }

        const eventUpdated = await Event.findByIdAndDelete(eventId);

        res.status(200).json({
            ok: true,
            msg: 'Evento Borrado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: false,
            msg: 'Hable con el administrador'
        });
    }
};

module.exports = {
    getEvents,
    addEvents,
    updateEvents,
    deleteEvents
};
