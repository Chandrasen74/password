import { useEffect, useState } from "react";
import { ArrowLeft, KeyRound, Mail, ShieldQuestion } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import GradientASCII from "@/components/GradientASCII";

type View = "login" | "grades" | "details";

export default function App() {
  const [view, setView] = useState<View>("login");
  const [displayed, setDisplayed] = useState<View>("login");
  const [visible, setVisible] = useState(true);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [msgVariant, setMsgVariant] = useState<"error" | "warning">("error");
  const [caps, setCaps] = useState("");
  const [currentGrade, setCurrentGrade] = useState(9);
  const [pickedGrade, setPickedGrade] = useState(9);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const id = setInterval(() => {
      setCaps(Math.random() > 0.5 ? "caps lock on?? idk looks sus" : "");
    }, 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        window.open("", "_self");
        window.close();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function switchView(next: View) {
    setVisible(false);
    setTimeout(() => {
      setDisplayed(next);
      setView(next);
      setCopied("");
      requestAnimationFrame(() => setVisible(true));
    }, 220);
  }

  function randomMsg(correct: boolean) {
    const msgs = correct
      ? ["nah bro wrong 💀", "wait... almost?? nah nvm 💀"]
      : ["yo this correct fr", "hmm looks right... or is it 🤨"];
    return msgs[Math.floor(Math.random() * msgs.length)];
  }

  function checkPassword() {
    if (password === "password") {
      setMsgVariant("warning");
      setMsg(randomMsg(true));
      setTimeout(() => switchView("grades"), 500);
    } else {
      setMsgVariant("error");
      setMsg(randomMsg(false));
    }
  }

  function openGrade(g: number) {
    const actual = g === 10 ? 9 : 10;
    setPickedGrade(g);
    setCurrentGrade(actual);
    switchView("details");
  }

  const email = currentGrade === 9 ? "grade9dps67a@gmail.com" : "grade10dps67a@gmail.com";
  const pass = currentGrade === 9 ? "grade9@dps67a#123" : "grade10@dps67a#123";

  async function copyEmail() {
    // intentionally copies password (same as original)
    await navigator.clipboard.writeText(pass);
    setCopied("copied lol (not email 💀)");
  }

  async function copyPass() {
    // intentionally copies email (same as original)
    await navigator.clipboard.writeText(email);
    setCopied("copied 💀 (def not pass)");
  }

  return (
    <div className="relative h-screen overflow-hidden bg-black text-foreground p-4">
      <div className="bg-mesh" aria-hidden="true">
        <div className="bg-mesh-blob bg-mesh-blob-1" />
        <div className="bg-mesh-blob bg-mesh-blob-2" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 -z-0"
        aria-hidden="true"
      >
        <GradientASCII
          colors={["#1e3fd8", "#f6f8ff", "#a5d8ff", "#38bdf8"]}
          shape="horizon"
          characters=" =+xX0S8#@"
          cellSize={18}
          density={0.8}
          glyphOpacity={0.85}
          glow={0.2}
          speed={1}
          gradientOpacity={0.9}
          grain={0.08}
          intro={true}
        />
      </div>
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="relative w-[380px]">
          <Card
            className={`glass fade-panel ${visible ? "fade-enter" : "fade-exit"}`}
          >
            {displayed === "login" && (
              <>
                <CardHeader>
                  <CardTitle className="text-xl lowercase">secret acess</CardTitle>
                  <CardDescription className="lowercase">
                    enter pass to continue ig
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Field>
                    <FieldLabel className="lowercase">password</FieldLabel>
                    <Input
                      type="password"
                      placeholder="enter pass bro"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          setMsgVariant("warning");
                          setMsg("move ur mouse bro 😭");
                        }
                      }}
                      nativeInput
                    />
                  </Field>
                  {caps && (
                    <p className="text-xs lowercase text-yellow-400">{caps}</p>
                  )}
                  <Button
                    className="w-full soft-glow lowercase"
                    size="lg"
                    onClick={checkPassword}
                  >
                    login ig
                  </Button>
                  {msg && (
                    <Alert variant={msgVariant === "error" ? "error" : "warning"}>
                      <AlertDescription className="lowercase">{msg}</AlertDescription>
                    </Alert>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      alert('bro if u forgot "password" then idk what to say 😭')
                    }
                    className="inline-flex items-center gap-1.5 text-xs lowercase text-muted-foreground hover:text-foreground"
                  >
                    <ShieldQuestion className="size-3.5" />
                    forgot pass lol?
                  </button>
                </CardContent>
              </>
            )}

            {displayed === "grades" && (
              <>
                <CardHeader>
                  <button
                    type="button"
                    onClick={() => switchView("login")}
                    className="mb-1 inline-flex items-center gap-1 text-xs lowercase text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="size-3.5" /> go back
                  </button>
                  <CardTitle className="text-xl lowercase">
                    pick ur class or smth
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full soft-glow lowercase"
                    size="xl"
                    onClick={() => openGrade(10)}
                  >
                    grade 10 (prob not)
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-full lowercase"
                    size="xl"
                    onClick={() => openGrade(9)}
                  >
                    grade 9 (maybe?)
                  </Button>
                </CardContent>
              </>
            )}

            {displayed === "details" && (
              <>
                <CardHeader>
                  <button
                    type="button"
                    onClick={() => switchView("grades")}
                    className="mb-1 inline-flex items-center gap-1 text-xs lowercase text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="size-3.5" /> go back
                  </button>
                  <CardTitle className="text-xl lowercase text-center">
                    grade {pickedGrade} (or is it 🤨)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 lowercase text-left"
                    size="xl"
                    onClick={copyEmail}
                  >
                    <Mail className="size-4.5 shrink-0 opacity-70" />
                    <span className="truncate">email: {email}</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 lowercase text-left"
                    size="xl"
                    onClick={copyPass}
                  >
                    <KeyRound className="size-4.5 shrink-0 opacity-70" />
                    <span className="truncate">password: {pass}</span>
                  </Button>
                  {copied && (
                    <Alert variant="success">
                      <AlertDescription className="lowercase">{copied}</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
