const Analytics = require('../models/analytics');
const { Op } = require('sequelize');
const { subtractSecondsFromCurrentTime } = require('../utils');

module.exports = {
  // POST /analytics
  async createEvents(req, res) {
    try {
      const events = req.body; // Expecting an array of events
      let ingestedCount = 0;

      for (const event of events) {
        const { eventType, user } = event;

        // Determine time window based on event type
        let timeWindow = 0;
        if (eventType === 'click') {
          timeWindow = 3;
        } else if (eventType === 'pageview') {
          timeWindow = 5;
        }

        // Check for duplicates within the time window
        const timeLimit = subtractSecondsFromCurrentTime(timeWindow);
        const existingEvent = await Analytics.findOne({
          where: {
            user: user,
            eventType: eventType,
            date: {
              [Op.gte]: timeLimit,
            },
          },
        });

        if (!existingEvent) {
          // No duplicate found, create new event
          await Analytics.create({
            eventType,
            user,
            date: new Date(),
          });
          ingestedCount++;
        }
      }

      // Respond with the number of ingested events
      return res.status(201).json({ ingested: ingestedCount });
    } catch (error) {
      console.error('Error ingesting events:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // GET /analytics
  async getAllEvents(req, res) {
    try {
      const events = await Analytics.findAll();
      return res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // DELETE, PUT, PATCH /analytics/:id
  notAllowed(req, res) {
    return res.status(405).json({ error: 'Method Not Allowed' });
  },
};
