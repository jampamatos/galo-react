// To convert the code to JS, run the command: npx tsc
// To start the server, run the command: node dist/server.js

const cheerio = require('cheerio');
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const formatDate = (text: string): string => {
    // Substitui a data no formato AAAA/MM/DD ou AAAA/DD/MM e mantém apenas DD/MM
    return text.replace(/(\d{4})[^\d]?(\d{2})[^\d]?(\d{2})/, (_, ano, dia, mes) => `${dia}/${mes}`);
};

app.get('/next-match', async (req: any, res: any) => {
    try {
        const { data } = await axios.get('https://atletico.com.br');
        const $ = cheerio.load(data);

        const matchElement = $('.lista-jogos-jogo').first();

        if (!matchElement.length) {
            throw new Error('Elemento de jogo não encontrado');
        }

        const homeTeam = {
            name: matchElement.find('.mandante abbr').attr('title'),
            logo: matchElement.find('.mandante img').attr('src'),
            abbreviation: matchElement.find('.mandante abbr').text(),
        };

        const awayTeam = {
            name: matchElement.find('.visitante abbr').attr('title'),
            logo: matchElement.find('.visitante img').attr('src'),
            abbreviation: matchElement.find('.visitante abbr').text(),
        };

        let matchInfo = matchElement.find('.lista-jogos-jogo-local').text().trim();

        // Substitui a data para o formato DD/MM/AAAA
        matchInfo = formatDate(matchInfo);
        matchInfo = matchInfo.replace(/^([\w\s]+) (\d{2}\/\d{2} às \d{2}:\d{2} \| .+)$/, (_: any, campeonato: any, restante: any) => {
            return `<strong>${campeonato}</strong> ${restante}`;
        });

        res.json({ homeTeam, awayTeam, matchInfo });
    } catch (error: any) {
        console.error('Erro no scraping:', error.message);
        res.status(500).json({ error: 'Erro ao obter informações do próximo jogo' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
