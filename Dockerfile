FROM node:carbon-alpine

ARG VCS_REF
ARG VCS_URL
ARG IMAGE_NAME
ARG IMAGE_DESCRIPTION

LABEL org.label-schema.vendor="IBM" \
      org.label-schema.name="$IMAGE_NAME" \
      org.label-schema.description="$IMAGE_DESCRIPTION" \
      org.label-schema.vcs-ref=$VCS_REF \
      org.label-schema.vcs-url=$VCS_URL \
      org.label-schema.license="Licensed Materials - Property of IBM" \
      org.label-schema.schema-version="1.0"

RUN mkdir -p /opt/ibm/icp-grc-ui
WORKDIR /opt/ibm/icp-grc-ui

COPY . /opt/ibm/icp-grc-ui

EXPOSE 3000

ENV NODE_ENV production
CMD ["node", "app.js"]