# בחר את התמונה הבסיסית של Node.js
FROM node:18 AS build

# הגדרת ספריית עבודה
WORKDIR /app

# העתק את קובצי package.json ו- package-lock.json
COPY package.json package-lock.json ./

# התקן את התלויות
RUN npm install
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

# העתק את כל שאר הקבצים
COPY . .

# הרץ את הפקודה build לייצור הקבצים המינימליים של האפליקציה
RUN npm run build --prod

# הוסף את ההגדרה כדי להאזין על כל כתובת IP, וגם את הפורט 4200
CMD ["npm", "run", "start", "--host", "0.0.0.0", "--port", "4200"]
