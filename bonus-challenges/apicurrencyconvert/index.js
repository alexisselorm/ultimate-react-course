const express = require('express');
const app = express();
const cors=require('cors')
const morgan = require('morgan');

app.use(cors())
app.use(morgan('combined'))

const port = 3000;

// Expanded mock conversion rates
const mockRates = {
    'USD': { 'EUR': 0.91, 'CAD': 1.35, 'INR': 83.25, 'ZAR': 18.15 },
    'EUR': { 'USD': 1.10, 'CAD': 1.48, 'INR': 91.50, 'ZAR': 19.80 },
    'CAD': { 'USD': 0.74, 'EUR': 0.68, 'INR': 62.00, 'ZAR': 13.40 },
    'INR': { 'USD': 0.012, 'EUR': 0.011, 'CAD': 0.016, 'ZAR': 0.22 },
    'ZAR': { 'USD': 0.055, 'EUR': 0.050, 'CAD': 0.075, 'INR': 4.50 },
};

app.get('/latest', (req, res) => {
    const { amount, from, to } = req.query;

    if (!amount || !from || !to) {
        return res.status(400).json({ error: "Missing required query params: amount, from, to" });
    }

    const convertedRate = mockRates[from]?.[to];

    if (!convertedRate) {
        return res.status(404).json({ error: "Conversion rate not found" });
    }

    res.json({
        amount: parseFloat(amount),
        base: from,
        date: new Date().toISOString().split('T')[0],
        rates: {
            [to]: convertedRate
        }
    });
});

app.listen(port, () => {
    console.log(`Currency converter API running at http://localhost:${port}`);
});
