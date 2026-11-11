import { useEffect, useRef, useState } from "react";
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
import RefineFrame from "@/components/RefineFrame/RefineFrame";
import BlurText from "@/components/BlurText/BlurText";
import easterEggImage from "@/assets/easter-egg.webp";

type View = "login" | "grades" | "details" | "easter";

export default function App() {
  const [view, setView] = useState<View>("login");
  const [displayed, setDisplayed] = useState<View>("login");
  const [visible, setVisible] = useState(true);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [msgVariant, setMsgVariant] = useState<"error" | "warning">("error");
  const [caps, setCaps] = useState("");
  const [currentGrade, setCurrentGrade] = useState(9);
  const [pickedGrade, setPickedGrade] = useState<9 | 10 | null>(null);
  const [copied, setCopied] = useState("");
  const [forgotClicks, setForgotClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [easterEggVisible, setEasterEggVisible] = useState(false);
  const [easterEggGrade, setEasterEggGrade] = useState<9 | 10 | null>(null);
  const [refineStage, setRefineStage] = useState<"queued" | "generating" | "refining" | "complete">("complete");

  const forgotTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  function openGrade(g: 9 | 10) {
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

  function openEasterEgg() {
    setShowEasterEgg(true);
    setEasterEggVisible(false);
    setEasterEggGrade(pickedGrade ?? null);
    setRefineStage("queued");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setEasterEggVisible(true));
    });
  }

  function closeEasterEgg() {
    setEasterEggVisible(false);
    setTimeout(() => setShowEasterEgg(false), 350);
  }

  function handleForgotClick() {
    setForgotClicks(prev => {
      const next = prev + 1;
      if (next === 1) {
        if (forgotTimer.current) clearTimeout(forgotTimer.current);
        forgotTimer.current = setTimeout(() => setForgotClicks(0), 2000);
        setMsgVariant("warning");
        setMsg('bro if u forgot "password" then idk what to say 😭');
        return 1;
      }
      if (next === 2) {
        if (forgotTimer.current) clearTimeout(forgotTimer.current);
        setForgotClicks(0);
        setMsg("");
        openEasterEgg();
        return 0;
      }
      return 0;
    });
  }

  useEffect(() => {
    if (!showEasterEgg) return;
    setRefineStage("generating");
    const t1 = setTimeout(() => setRefineStage("refining"), 700);
    const t2 = setTimeout(() => setRefineStage("complete"), 1400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [showEasterEgg]);

  const themeName = pickedGrade === 10 ? "grade-10" : pickedGrade === 9 ? "grade-9" : "default";
  const gradeBg =
    pickedGrade === 10
      ? "radial-gradient(circle at 50% 50%, #064e3b 0%, #000000 55%)"
      : pickedGrade === 9
        ? "radial-gradient(circle at 50% 50%, #7f1d1d 0%, #000000 55%)"
        : "black";
  const gradeColors =
    pickedGrade === 10
      ? ["#10b981", "#34d399", "#6ee7b7", "#059669"]
      : pickedGrade === 9
        ? ["#ef4444", "#fca5a5", "#f87171", "#b91c1c"]
        : ["#1e3fd8", "#f6f8ff", "#a5d8ff", "#38bdf8"];

  const easterBg = "radial-gradient(circle at 50% 50%, #831843 0%, #000000 55%)";
  const easterColors = ["#ec4899", "#f9a8d4", "#f472b6", "#be185d"];
  const themeBg = showEasterEgg ? easterBg : gradeBg;
  const themeColors = showEasterEgg ? easterColors : gradeColors;
  const asciiCharacters = showEasterEgg ? "♥♡❤❥♥♡" : " =+xX0S8#@";
  const meshStyle = showEasterEgg
    ? ({ "--mesh-color-1": "#ec4899", "--mesh-color-2": "#f9a8d4" } as React.CSSProperties)
    : undefined;

  return (
    <div
      className="app-shell relative text-foreground p-3 sm:p-4 theme-transition"
      data-theme={themeName}
      style={{ background: themeBg, ...meshStyle }}
    >
      <div className="bg-mesh" aria-hidden="true">
        <div className="bg-mesh-blob bg-mesh-blob-1" />
        <div className="bg-mesh-blob bg-mesh-blob-2" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 -z-0 transition-opacity duration-700"
        aria-hidden="true"
        style={{ opacity: 1 }}
      >
        <GradientASCII
          colors={themeColors}
          shape="horizon"
          characters={asciiCharacters}
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
      <div className="app-content relative z-10 flex flex-col items-center">
        <div className="relative w-full max-w-[380px] my-auto py-6 px-1">
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
                    onClick={handleForgotClick}
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

            {showEasterEgg && (
              <div className={`fade-panel ${easterEggVisible ? "fade-enter" : "fade-exit"}`}>
                <CardHeader>
                  <button
                    type="button"
                    onClick={closeEasterEgg}
                    className="inline-flex items-center gap-1 text-xs lowercase text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="size-3.5" /> go back
                  </button>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-center justify-center">
                    <RefineFrame
                      status={refineStage}
                      children={
                        <img
                          src={easterEggImage}
                          alt="easter egg"
                          crossOrigin="anonymous"
                          style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                      }
                      width={300}
                      radius={16}
                      aspectRatio="3 / 4"
                      background={
                        easterEggGrade === 9 ? "#7f1d1d" : easterEggGrade === 10 ? "#064e3b" : "#27272a"
                      }
                      color={
                        easterEggGrade === 9 ? "#ef4444" : easterEggGrade === 10 ? "#10b981" : "#f5f5f5"
                      }
                      stageDuration={250}
                      sweep
                      showStatus={false}
                      hideAfter={0}
                    />
                  </div>
                  {refineStage === "complete" && (
                    <BlurText
                      text='ab aagaya yaad "password" ?'
                      effect="blur"
                      animateBy="words"
                      direction="top"
                      staggerFrom="start"
                      trigger="load"
                      delay={200}
                      stepDuration={0.35}
                      blur={10}
                      distance={50}
                      loop={false}
                      color={
                        easterEggGrade === 9 ? "#ef4444" : easterEggGrade === 10 ? "#10b981" : "#f5f5f5"
                      }
                      className="text-lg sm:text-xl text-center mb-2"
                    />
                  )}
                </CardContent>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
