# CELPIP Speaking Rubric Reference v0.1

**Built:** Day 1
**Primary source:** Paragon Testing Enterprises — CELPIP Score Comparison Chart, Speaking Level Descriptors (Levels 5-12)
**Purpose:** Foundation document for AI scoring system prompt. All content paraphrased from official descriptors.

---

## Section 1: The 8 Speaking Tasks

| # | Task | Prep Time | Speak Time |
|---|------|-----------|------------|
| 1 | Giving Advice | 30s | 90s |
| 2 | Talking About a Personal Experience | 30s | 60s |
| 3 | Describing a Scene | 30s | 60s |
| 4 | Making Predictions | 30s | 60s |
| 5 | Comparing and Persuading | 60s | 60s |
| 6 | Dealing with a Difficult Situation | 60s | 60s |
| 7 | Expressing Opinions | 30s | 90s |
| 8 | Describing an Unusual Situation | 30s | 60s |

The four scoring criteria apply to every task: Content/Coherence, Vocabulary, Listenability, Task Fulfillment. Each task is rated independently across all four dimensions.

---

## Section 2: Level Descriptors by Criterion (Levels 5-12)

Each level builds on the previous. A response at Level 9 demonstrates everything in Levels 5-8 plus the additional capabilities listed at Level 9.

### Content / Coherence

Level 5 — Acquiring proficiency: Communicates feelings and preferences. Describes familiar objects, situations, and people. Tells simple stories about personal experience.

Level 6 — Developing proficiency: Supports opinions and feelings with reasons. Relates factual information.

Level 7 — Adequate proficiency: Presents concrete and some abstract information supported with moderately complex reasons.

Level 8 — Good proficiency: Presents concrete and some abstract information supported with moderately complex reasons. (Distinction from L7 sits primarily in vocabulary and listenability dimensions at this level.)

Level 9 — Effective proficiency: Presents information and supports ideas with moderately complex reasoning.

Level 10 — Highly effective proficiency: Communicates in moderately demanding non-routine situations. Develops ideas with clear descriptions or reasons.

Level 11 — Advanced proficiency: Communicates in demanding non-routine situations across a range of purposes. Develops ideas with clear and precise descriptions or details.

Level 12 — Expert proficiency: Communicates in demanding non-routine situations across a full range of purposes, intentions, and objectives. Develops ideas with complex, clear, and precise descriptions or details.

### Vocabulary

Level 5: Uses common words.
Level 6: Uses common words.
Level 7: Uses common words and some more precise vocabulary to communicate meaning. Uses some figures of speech and idioms.
Level 8: Uses common words and some context-specific vocabulary. Uses some figures of speech and idioms.
Level 9: Uses common and context-specific vocabulary. Uses some figures of speech and idioms.
Level 10: Uses a range of concrete and abstract language. Uses some figures of speech and idioms.
Level 11: Uses a broad range of concrete and abstract language. Uses a range of figures of speech and idioms.
Level 12: Uses a very broad range of concrete and abstract language. Uses a broad range of figures of speech and idioms.

### Listenability

Level 5: Some control of simple grammatical structures.
Level 6: Control of simple grammatical structures. Usually speaks with understandable rhythm, pronunciation, and intonation. Some self-corrections, repetitions, or inappropriate pauses present.
Level 7: Good control of simple grammatical structures. Speaks clearly with understandable rhythm, pronunciation, and intonation. Very few self-corrections, repetitions, or inappropriate pauses.
Level 8: Some control of complex grammatical structures. Speaks intelligibly with mostly fluent rhythm, pronunciation, and intonation. Very few self-corrections, repetitions, or inappropriate pauses.
Level 9: Some control of complex grammatical structures. Speaks intelligibly with mostly fluent rhythm, pronunciation, and intonation.
Level 10: Good control of a broad range of complex grammatical structures. Speaks intelligibly with mostly fluent rhythm, pronunciation, and intonation.
Level 11: Good control of a broad range of complex and diverse grammatical structures. Speaks intelligibly with consistently fluent rhythm, pronunciation, and intonation.
Level 12: Very good control of a very broad range of complex and diverse grammatical structures. Speaks intelligibly with consistently fluent rhythm, pronunciation, and intonation.

### Task Fulfillment

Level 5: Conveys information about a familiar topic.
Level 6: Adjusts speaking style to suit some familiar situations. Conveys accurate information.
Level 7: Adjusts speaking style and tone to some familiar listeners and situations. Conveys intended meaning.
Level 8: Adjusts speaking style and tone to some audiences and situations. Conveys intended meaning.
Level 9: Adjusts speaking style and tone to a range of audiences and situations. Conveys ideas to others.
Level 10: Adjusts speaking style and tone to a broad range of audiences and situations. Conveys ideas to others.
Level 11: Adapts language to most situations, desired purposes, and relationships to listeners. Communicates ideas to others.
Level 12: Adapts language to the situation, desired purposes, and relationships to listeners. Precisely communicates ideas to others.

---

## Section 3: Quick-Reference Distinguishers (CELPIP 7 vs 9 vs 11)

Level 7 → Level 9 Jump:
- Vocabulary: From "common words + some more precise" to "common AND context-specific vocabulary"
- Content/Coherence: From "concrete and some abstract info with moderately complex reasons" to genuine support of ideas with that reasoning
- Listenability: From "good control of simple structures" to "some control of complex structures"
- Task Fulfillment: From "some familiar listeners" to "a range of audiences and situations"

Level 9 → Level 11 Jump:
- Vocabulary: From "common + context-specific" to "broad range of concrete and abstract language" + "range of figures of speech"
- Content/Coherence: From "moderately complex reasoning" to "demanding non-routine situations" + "clear and precise descriptions"
- Listenability: From "some control of complex structures" to "good control of broad range of complex AND diverse structures" + "consistently fluent" rhythm
- Task Fulfillment: From "a range of audiences" to "most situations, desired purposes, relationships to listeners"

---

## Section 4: Task-Specific Success Markers

(To be filled after capturing Sample Responses + Response Analysis from Score Comparison Chart and watching teardowns. Generic rubric applies to all tasks; task-specific notes capture what each prompt type uniquely demands.)

Task 1 (Giving Advice): [pending]
Task 2 (Personal Experience): [pending]
Task 3 (Describing a Scene): [pending]
Task 4 (Making Predictions): [pending]
Task 5 (Comparing and Persuading): [pending]
Task 6 (Difficult Situation): [pending]
Task 7 (Expressing Opinions): [pending]
Task 8 (Unusual Situation): [pending]

---

## Section 5: Common Low-Band Failure Patterns

- Filler words and disfluencies: "um," "uh," repeated false starts (Level 6 has "some," Level 7-8 has "very few")
- Self-corrections and inappropriate pauses: frequency drops sharply between Level 6 and Level 8
- Vocabulary repetition: Limited range = Level 5-6; range expands at Level 7+
- Grammatical simplicity: Only simple structures = Level 5-7; complex structures appear at Level 8+
- Failure to address all parts of a multi-part prompt: Affects Task Fulfillment directly
- Off-topic padding: Conveying inaccurate information drops Task Fulfillment to Level 5 or below
- Going over or under time: Incomplete responses cap Task Fulfillment regardless of quality
- Memorized/scripted-sounding responses: Reduces Listenability (rhythm becomes unnatural) and Content/Coherence (response doesn't match prompt specifics)

---

## Section 6: AI Scoring Implementation Notes

Listenability is partially observable from transcripts:
- Observable from text: filler density, sentence complexity, grammatical control, vocabulary variety, self-correction frequency (via Whisper word-level timing)
- Not observable from text alone: pronunciation, intonation, rhythm fluency
- V1 approach: Score Listenability from observable markers. Disclose limitation to user.
- V2 approach: Add multimodal audio analysis (GPT-4o audio or Gemini) for full Listenability scoring.

Vocabulary and Content/Coherence are well-observable from transcripts:
- Vocabulary range = unique-word ratio + context-specificity scoring via LLM
- Idiom/figure-of-speech detection = LLM identification + flag count
- Reasoning complexity = LLM assessment against descriptor language

Task Fulfillment requires task-specific prompts:
- Each of the 8 task types needs custom evaluation criteria in the AI prompt
- Generic "did they answer the question" check is insufficient
- Use the task-specific markers (Section 4) as the evaluation criteria

Always include disclaimer in user-facing scores:
"This is AI-generated practice feedback to help you improve. It is not an official CELPIP score and may differ from official examiner scoring."

Force structured JSON output schema for AI feedback:
{
  "content_coherence": {"level": 8, "reasoning": "...", "specific_examples": [...]},
  "vocabulary": {"level": 7, "reasoning": "...", "specific_examples": [...]},
  "listenability": {"level": 8, "reasoning": "...", "specific_examples": [...], "limitation_note": "Pronunciation not assessed"},
  "task_fulfillment": {"level": 9, "reasoning": "...", "specific_examples": [...]},
  "estimated_overall_level": 8,
  "top_three_improvements": ["...", "...", "..."]
}

---

## Section 7: Source Materials & Calibration

Primary sources used:
- CELPIP Score Comparison Chart, Speaking Level Descriptors (Levels 5-12), Paragon Testing Enterprises, accessed via celpip.ca

Pending action items before this document is v1.0:
1. Capture Sample Responses for at least 3 levels (Levels 7, 9, 11) across at least 3 task types
2. Capture Response Analysis content explaining why each sample earned its level
3. Watch official CELPIP YouTube sample videos for tasks not covered in the Score Comparison Chart
4. Watch 2-3 unofficial teardowns (CELPIP Mastery, Mighty Tips, Presto English) for calibration
5. Fill in Section 4 with task-specific success markers

---

## Version History

- v0.1 — Day 1: Level Descriptors compiled from Score Comparison Chart
- v0.2 — Day 2: Add Sample Responses + Response Analysis + task-specific markers
- v0.3 — Week 2: First calibration adjustments after testing AI scoring on user responses
- v1.0 — Week 4: Stable version locked for MVP launch