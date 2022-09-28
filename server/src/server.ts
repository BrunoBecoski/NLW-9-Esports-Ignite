import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod';

import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes'
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string'

const app = express()

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({
  log: ['query']
})

const validationAd = z.object({
  gameId: z.string().uuid(),
  name: z.string().min(1),
  yearsPlaying: z.number().nonnegative(),
  discord: z.string().min(6).max(37).regex(/#[0-9]{4}$/),
  weekDays: z.array(z.number()).nonempty().max(7),
  hourStart: z.string().regex(/[0-9]{2}:[0-9]{2}/),
  hourEnd: z.string().regex(/[0-9]{2}:[0-9]{2}/),
  useVoiceChannel: z.boolean(),
})

app.get('/games', async (resquest, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  })
  
  return response.json(games);
});

app.post('/games/:id/ads', async (request, response) => {
  const gameId: string = request.params.id
  const body: any = request.body

  try {
    validationAd.parse({
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays,
      hourStart: body.hourStart,
      hourEnd: body.hourEnd,
      useVoiceChannel: body.useVoiceChannel,
    });
    

    const ad = await prisma.ad.create({
      data: {
        gameId,
        name: body.name,
        yearsPlaying: body.yearsPlaying,
        discord: body.discord,
        weekDays: body.weekDays.join(','),
        hourStart: convertHourStringToMinutes(body.hourStart),
        hourEnd: convertHourStringToMinutes(body.hourEnd),
        useVoiceChannel: body.useVoiceChannel,
      }
    })
    
    return response.status(201).json(ad);
  } catch(err) {
    return response.status(422).json(err);
  }
});

app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id

  const game = await prisma.game.findFirst({
    where: {
      id: gameId,
    }
  })

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedAds = ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),
    }
  })

  return response.json({
    game,
    ads: formattedAds,
  });
});

app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    }
  })

  return response.json({
    discord: ad.discord,
  });
});

app.listen(3333);