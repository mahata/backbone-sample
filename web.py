#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
from flask import Flask, request, session, g, redirect, url_for, render_template


app = Flask(__name__)
app.config.update(DEBUG=True)


@app.route("/")
def index():
    return render_template("index.html", var={"hey": "yo"})


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
