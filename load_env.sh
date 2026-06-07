#!/bin/bash
export $(grep -v '^#' .env.local | xargs)
npm run dev
