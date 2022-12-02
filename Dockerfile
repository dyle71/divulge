# This file is part of the divulge Source Code.
# See the LICENSE file in the project root folder.
# (C) Copyright 2022, oliver.maurhart@headcode.space

FROM node:lts

RUN mkdir -p /divulge /divulge/slides /divulge/themes /divulge/plugin

COPY package.json /divulge/
RUN cd /divulge && npm install

COPY LICENSE /divulge
COPY index.js /divulge/
COPY plugin /divulge/plugin
COPY slides /divulge/slides
COPY themes /divulge/themes

VOLUME [ "/divulge/slides", "/divulge/themes" ]
WORKDIR /divulge
CMD ["npm", "run", "show"]
