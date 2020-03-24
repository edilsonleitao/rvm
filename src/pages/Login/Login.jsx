import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { Main } from "./styles";

export default function SignIn() {
  return (
    <>
      <CssBaseline />

      <Main>
        <Container component="main" maxWidth="xs">
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Entrar
          </Typography>

          <form>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Manter-me logado"
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Entrar
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  Cadastre-se
                </Link>
              </Grid>
            </Grid>
          </form>

          <Box mt={8}>
            <Typography variant="body2" color="textSecondary" align="center">
              {`Copyright © Salutis Tecnologia ${new Date().getFullYear()}.`}
            </Typography>
          </Box>
        </Container>
      </Main>
    </>
  );
}
