/**
 * CASE-STUDIES.JS — Modal Handler and In-Depth Case Study Deep Dives
 * Strict alignment with Ibrahim Yaghi's CV & Portfolio source of truth
 */

(function () {
  'use strict';

  const caseStudiesData = {
    botzilla: {
      category: 'ENTERPRISE RAG & KNOWLEDGE PLATFORM',
      title: 'Botzilla — Multi-Team Isolated Enterprise RAG Chatbot',
      metric: '5–15s Grounded Answers',
      highlightBadge: 'QDRANT VECTOR DB · LANGCHAIN · OPENAI',
      problem: `Enterprise departments at Zain Jordan—including legal, finance, human resources, and network operations—managed confidential operational knowledge locked inside disparate document repositories (PDFs, Word documents, policy manuals). 

Manual discovery was time-intensive (15–45 minutes per query), while commercial public LLM interfaces were strictly prohibited due to telecom data confidentiality regulations. Furthermore, different departments required complete document segregation: sensitive financial or legal data could not be retrievable by unauthorized staff.`,
      solution: `I engineered Botzilla, a secure enterprise Retrieval-Augmented Generation (RAG) platform built with Python, LangChain, and OpenAI, deployed entirely within Zain Jordan's enterprise perimeter.

To resolve the security dilemma, I architected a multi-team isolated namespace architecture on top of Qdrant vector database. Each department's document corpus is ingested, chunked, and embedded into physically segregated Qdrant collections. When a query is initiated, user authentication and role tokens restrict vector similarity searches strictly to authorized collections, making cross-team data leaks impossible at the vector DB level.`,
      architecture: [
        { step: '01. Document Ingestion', detail: 'Automated parser cleans enterprise PDFs/docs, generating semantic chunks with cryptographic hash IDs and department metadata.' },
        { step: '02. Qdrant Namespace Indexing', detail: 'Embeddings stored in departmental Qdrant collections using HNSW indexing for rapid sub-40ms vector recall.' },
        { step: '03. Identity & RBAC Token Check', detail: 'Central orchestrator verifies user credentials before permitting search dispatch.' },
        { step: '04. Hybrid Dense Retrieval', detail: 'Retrieves top-k relevant text chunks with similarity threshold filtering to prevent hallucination.' },
        { step: '05. Grounded Prompt Synthesis', detail: 'LangChain constructs strict context-bounded prompts requiring inline citations for every factual claim.' },
        { step: '06. Delivery to User', detail: 'Grounded answer delivered in 5–15 seconds with verified source document excerpts.' }
      ],
      technologies: ['Python', 'LangChain', 'OpenAI', 'Qdrant Vector DB', 'SQLite', 'Enterprise RBAC'],
      impact: [
        'Cut document search and policy lookup times from 15–45 minutes down to 5–15 seconds.',
        'Zero cloud leakage: 100% of data queries executed within enterprise-controlled infrastructure.',
        'Adopted across multiple departments with seamless self-service knowledge expansion.',
        'Featured internationally by TM Forum for pioneering AI chatbot innovation in telecommunications.'
      ]
    },

    pyspark: {
      category: 'DISTRIBUTED DATA ENGINEERING',
      title: 'Enterprise Reconciliation Pipeline Optimization',
      metric: '8 Hours → Under 10 Minutes',
      highlightBadge: '97.9% RUNTIME REDUCTION · PYSPARK · APACHE SPARK',
      problem: `At a Tier-1 telecommunications provider handling tens of millions of daily transactions, large-scale financial and network reconciliation batch jobs were experiencing severe performance bottlenecks.

The legacy reconciliation pipelines required over 8 continuous hours of batch processing every night. This multi-hour latency delayed downstream reporting, created data starvation for internal AI services, and frequently caused compute resource contention during morning operational spikes.`,
      solution: `I led the complete distributed systems re-architecture of the reconciliation pipelines using PySpark and Apache Spark.

I profiled distributed execution plans to isolate major bottlenecks: severe data skew on partition keys, excessive shuffling across network nodes, and unindexed joins against massive lookup tables. I restructured the pipelines to leverage optimal hash partitioning, memory-efficient broadcast joins on dimensional metadata, and vectorized Parquet file formats, transforming serial bottlenecks into parallel cluster computations.`,
      architecture: [
        { step: '01. Pipeline Profiling', detail: 'Analyzed DAG execution stages to pinpoint shuffle spills and computational partition skew.' },
        { step: '02. Data Partitioning', detail: 'Implemented consistent custom partitioners based on high-cardinality transaction keys.' },
        { step: '03. Broadcast Hash Joins', detail: 'Replaced expensive shuffle joins with in-memory broadcast joins for high-frequency lookup dimensions.' },
        { step: '04. In-Memory Vectorized Aggregations', detail: 'Re-wrote aggregations using PySpark DataFrame APIs to maximize JVM Catalyst optimizer code generation.' },
        { step: '05. Automated Validation & Audit', detail: 'Built deterministic checksum verification to guarantee 100% financial reconciliation fidelity.' }
      ],
      technologies: ['Python', 'PySpark', 'Apache Spark', 'Distributed Computing', 'Parquet', 'Data Engineering'],
      impact: [
        'Batch execution dropped from 8 hours to under 10 minutes—a 97.9% runtime reduction.',
        'Eliminated data lags for downstream AI models, enabling fresh intra-day data ingestion.',
        'Substantially reduced compute cluster infrastructure costs and resource contention.',
        'Direct core driver of the ~4M JOD (~$5.6M USD) in cumulative cost savings delivered at Zain Jordan.'
      ]
    },

    sales: {
      category: 'AGENTIC AI & BUSINESS INTELLIGENCE',
      title: 'Agentic AI — Sales Data Agent & Visualizer',
      metric: 'Zero End-User Database Access',
      highlightBadge: 'LANGCHAIN · PL/SQL · ORACLE · DATA VIZ',
      problem: `Commercial directors, sales managers, and branch supervisors frequently needed ad-hoc sales analytics—such as regional handset performance, SIM activations, and branch comparisons.

Previously, every request required manual SQL scripting from overworked data engineering teams, resulting in multi-day turnarounds. Direct database access could not be granted to business users due to compliance policies and the risk of unoptimized queries or data exposure.`,
      solution: `I engineered Agentic AI: an autonomous, conversational agent that enables non-technical business employees to query enterprise data in natural language.

The agent uses schema-aware prompt templates to autonomously determine analytical intent, construct secure parameterized PL/SQL queries, execute them in a sandboxed Oracle environment, and return formatted statistical visualizations. To satisfy strict telecom compliance, I instituted strict "no-data-exposure" guardrails: the agent never dumps raw database tables, instead synthesizing concise charts and aggregated business metrics.`,
      architecture: [
        { step: '01. Natural Language Input', detail: 'Business user submits query in plain English or Arabic (e.g., "Compare 5G handset revenue between Amman and Zarqa in Q3").' },
        { step: '02. Intent & Schema Mapping', detail: 'Agent analyzes query intent against schema metadata without exposing confidential column details.' },
        { step: '03. Parameterized PL/SQL Generation', detail: 'Synthesizes sanitized SQL using parameterized bindings with zero injection risk.' },
        { step: '04. Sandboxed Execution', detail: 'Executes against read-only Oracle replication cluster with execution timeouts and row limits.' },
        { step: '05. Chart & Insight Rendering', detail: 'Converts returned rowsets into interactive visualizations and executive bullet takeaways.' }
      ],
      technologies: ['Python', 'LangChain', 'OpenAI', 'Oracle PL/SQL', 'Data Visualization', 'Security Guardrails'],
      impact: [
        'Eliminated full manual reporting cycles for sales, finance, and operations teams.',
        'Achieved instant data answers in seconds without writing a single line of SQL.',
        '100% adherence to telecom no-data-exposure controls with zero direct DB logins required.',
        'Broad organizational adoption across multiple non-technical business units.'
      ]
    },

    orchestrator: {
      category: 'PLATFORM ENGINEERING & INFRASTRUCTURE',
      title: 'Proprietary In-House Agent Orchestration Framework',
      metric: 'Backbone of 8 Production Agents',
      highlightBadge: 'PROPRIETARY ENGINE · ZERO FRAMEWORK LOCK-IN',
      problem: `Off-the-shelf LLM orchestration frameworks often suffer from heavy abstractions, third-party lock-in, and unpredictable latency. Moreover, they rarely provide first-class support for enterprise message queues, internal security perimeters, and non-developer runtime configuration.

Zain Jordan needed a reliable, resilient, and high-performance foundation to coordinate multiple specialized AI agents across business, HR, and technical workflows.`,
      solution: `I designed and developed a proprietary orchestration engine from scratch—without third-party framework dependencies—to manage all internal agents and Python backends.

The platform provides a unified interface connecting Python backends, Redis message queues for task buffering, and an ultra-fast SQLite state store for conversation memory. It manages intent classification, dynamic agent routing, multi-step agent chaining, fallback handling, and response aggregation in real time. In addition, I created configuration-driven platform components (including Excel-based runtime config) allowing domain teams to evolve prompts and tool parameters safely.`,
      architecture: [
        { step: '01. Central Router', detail: 'Classifies user intent and routes incoming requests to the optimal specialized agent.' },
        { step: '02. Session & Memory Store', detail: 'SQLite transactional state engine persists multi-turn dialogue context across interactions.' },
        { step: '03. Redis Task Queue', detail: 'Asynchronous workers consume tasks with backpressure management during peak loads.' },
        { step: '04. Agent Execution Layer', detail: 'Executes agent logic, tool calls, or RAG retrievals against connected internal services.' },
        { step: '05. Fallback & Aggregation', detail: 'Handles partial failures gracefully with automatic retries and returns standardized JSON responses.' },
        { step: '06. Runtime Config Engine', detail: 'Allows non-developers to tune prompt templates and tool definitions without code deployments.' }
      ],
      technologies: ['Python', 'Redis MQ', 'SQLite', 'LangChain', 'OpenAI', 'Custom Architecture', 'Runtime Config'],
      impact: [
        'Serves as the core backbone of Zain Jordan\'s internal AI ecosystem, coordinating all 8 production agents.',
        'Standardized the integration contract, enabling new agents to be shipped rapidly.',
        'Honored with Best Digital Transformation Initiative in Telecom at Global Economics 2025.'
      ]
    }
  };

  const modal = document.getElementById('case-study-modal');
  const modalSlot = document.getElementById('modal-content-slot');
  const closeBtn = document.getElementById('modal-close-btn');

  function init() {
    // Attach click listeners to case study cards
    const triggers = document.querySelectorAll('.case-deepdive-btn');
    triggers.forEach(btn => {
      btn.addEventListener('click', () => {
        const caseKey = btn.getAttribute('data-case');
        if (caseKey && caseStudiesData[caseKey]) {
          openCaseStudy(caseKey);
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal();
        }
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('is-active')) {
        closeModal();
      }
    });
  }

  function openCaseStudy(key) {
    const data = caseStudiesData[key];
    if (!data || !modal || !modalSlot) return;

    modalSlot.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <span class="section-badge" style="margin-bottom: 0.75rem;">
          <span class="section-badge-dot"></span>
          ${data.category}
        </span>
        <h2 style="font-size: clamp(1.8rem, 3.2vw, 2.4rem); color: #ffffff; margin-bottom: 0.5rem; line-height: 1.2;">
          ${data.title}
        </h2>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center; margin-top: 0.75rem;">
          <span class="case-metric-highlight">${data.metric}</span>
          <span class="tech-tag highlight">${data.highlightBadge}</span>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <!-- Problem Section -->
        <div>
          <h4 style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--blue-accent-light); text-transform: uppercase; margin-bottom: 0.6rem;">
            01. The Enterprise Challenge
          </h4>
          <p style="font-size: 0.98rem; line-height: 1.7; color: var(--text-secondary); white-space: pre-line;">
            ${data.problem}
          </p>
        </div>

        <!-- Solution Section -->
        <div>
          <h4 style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--blue-accent-light); text-transform: uppercase; margin-bottom: 0.6rem;">
            02. Engineered Solution & Architecture
          </h4>
          <p style="font-size: 0.98rem; line-height: 1.7; color: var(--text-secondary); margin-bottom: 1.25rem;">
            ${data.solution}
          </p>

          <div style="background: rgba(4, 8, 20, 0.6); border: 1px solid var(--glass-border); border-radius: var(--radius-md); padding: 1.5rem;">
            <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--cyan-subtle); margin-bottom: 1rem; text-transform: uppercase;">
              Architectural Execution Flow:
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.85rem;">
              ${data.architecture.map(arch => `
                <div style="display: flex; gap: 0.85rem; font-size: 0.9rem;">
                  <strong style="color: #60a5fa; min-width: 140px; font-family: var(--font-mono); font-size: 0.82rem;">${arch.step}</strong>
                  <span style="color: var(--text-muted); line-height: 1.5;">${arch.detail}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Technology Stack -->
        <div>
          <h4 style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--blue-accent-light); text-transform: uppercase; margin-bottom: 0.6rem;">
            03. Core Technologies & Frameworks
          </h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${data.technologies.map(t => `<span class="tech-tag highlight">${t}</span>`).join('')}
          </div>
        </div>

        <!-- Measurable Business Impact -->
        <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: var(--radius-md); padding: 1.5rem;">
          <h4 style="font-family: var(--font-mono); font-size: 0.85rem; color: #34d399; text-transform: uppercase; margin-bottom: 0.75rem;">
            04. Measurable Business Impact
          </h4>
          <ul style="display: flex; flex-direction: column; gap: 0.6rem;">
            ${data.impact.map(imp => `
              <li style="display: flex; align-items: flex-start; gap: 0.65rem; font-size: 0.94rem; color: #ffffff;">
                <span style="color: #34d399; font-weight: bold;">✓</span>
                <span>${imp}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    `;

    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
