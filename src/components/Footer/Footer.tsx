import React, { useState } from "react";

import { text } from "res/i18n/text";
import { t } from "res/i18n/i18n";

import { Grid, Link, Typography } from "@mui/material";
import { ScrollableDialog } from "components/Bricks/ScrollableDialog";

import Logo from "res/icons/logo.png";

import "./footer.css";

const { articles } = text();

export interface Article {
  name: string;
  title: string;
  html: string;
}

export const Footer = () => {
  const [ showArticle, setShowArticle ] = useState<null | Article>(null);


  const handleShowArticle = (article: Article) => {
    setShowArticle(article);
  };

  return <>
    <div className="footer">
      <div>
        <img src={Logo} alt="logo" className="footer__logo" />
      </div>
      <div className="footer__links">
        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item>
            <Typography variant="h3">{t("footer.links")}</Typography>
          </Grid>
          {articles.map(article => <Grid key={article.name} item>
            <Link className="footer__link" onClick={() => handleShowArticle(article)}>
              {article.title}
            </Link>
          </Grid>)}
        </Grid>
      </div>
      <div></div>
    </div>
    {articles.map(article => <ScrollableDialog
      key={"dlg" + article.name}
      onClose={() => setShowArticle(null)}
      articleText={article.html}
      articleTitle={article.title}
      open={article.name === showArticle?.name}
      closeText={t("footer.close")}
    />)}
  </>;
};
