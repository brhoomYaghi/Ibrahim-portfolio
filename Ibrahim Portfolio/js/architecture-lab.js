/**
 * ARCHITECTURE-LAB.JS — Interactive AI Architecture & Platform Visualizer
 * Real-time Node Inspection, Telemetry Streams, and Multi-Step Simulation Routing
 * Created for Ibrahim Yaghi's Portfolio
 */

(function () {
  'use strict';

  // Component Data Store
  const nodeDatabase = {
    'orchestrator': {
      type: 'PROPRIETARY ORCHESTRATION ENGINE',
      title: 'In-House Agent Orchestrator Core',
      status: 'ACTIVE · PRIMARY CLUSTER',
      desc: 'Proprietary orchestration engine built from scratch (no third-party frameworks) to route user requests across 8 specialized AI agents. Manages session context, dynamic routing, multi-agent chaining, fallback recovery, and response aggregation in real time.',
      latency: '< 120ms Routing Overhead',
      security: 'Zero Data Exposure / RBAC',
      protocol: 'Redis Pub/Sub & Workers',
      storage: 'SQLite Local Transactional',
      telemetry: {
        routing_id: 'req_orchestrator_991b',
        engine_type: 'proprietary_zero_lockin',
        active_specialized_agents: 8,
        concurrency_limit: 'dynamic_scaling',
        state_sync: 'sqlite_in_memory_persist',
        event_dispatch: 'redis_cluster'
      }
    },
    'web-client': {
      type: 'CLIENT INGRESS',
      title: 'Enterprise Web Portal',
      status: 'ONLINE',
      desc: 'Intuitive web interface deployed across Zain Jordan sales, finance, and operations teams for natural language interaction with enterprise AI services.',
      latency: '< 45ms Network RTT',
      security: 'Enterprise SSO / TLS 1.3',
      protocol: 'HTTPS / WebSockets',
      storage: 'Session Storage Only',
      telemetry: {
        client_type: 'enterprise_portal',
        auth_level: 'role_based_executive',
        encryption: 'TLS_1_3_AES_256',
        active_sessions: 420
      }
    },
    'voice-gateway': {
      type: 'TELEPHONY & AUDIO INGRESS',
      title: 'Voice Screening Gateway',
      status: 'ONLINE',
      desc: 'Telephony interface connecting candidates to the AI phone screening agent, streaming live audio, managing turn-taking, and capturing interview transcripts.',
      latency: '< 250ms Audio Ingress',
      security: 'Audio Stream Tokenization',
      protocol: 'SIP / WebRTC Stream',
      storage: 'Ephemeral Audio Buffer',
      telemetry: {
        telephony_carrier: 'Zain_Jordan_VoLTE',
        sample_rate_hz: 16000,
        voice_vad_enabled: true,
        call_session_id: 'voice_call_7741'
      }
    },
    'redis-mq': {
      type: 'ASYNCHRONOUS MESSAGE QUEUE',
      title: 'Redis Message Queue',
      status: 'HEALTHY',
      desc: 'Decoupled task queue handling asynchronous dispatch and backpressure between the central orchestrator and backend agent worker pools.',
      latency: '< 2ms Queue Latency',
      security: 'VPC-Isolated Redis Auth',
      protocol: 'Redis RESP',
      storage: 'In-Memory Key/Value & PubSub',
      telemetry: {
        queue_depth: 3,
        processed_tasks_24h: 184520,
        worker_concurrency: 16,
        memory_usage_mb: 412
      }
    },
    'sqlite-state': {
      type: 'STATE & SESSION PERSISTENCE',
      title: 'SQLite State Store',
      status: 'SYNCHRONIZED',
      desc: 'Lightweight, ultra-fast transactional local state store tracking user session states, conversation memory, and multi-turn dialog contexts.',
      latency: '< 1ms Read/Write',
      security: 'Encrypted at Rest (AES-256)',
      protocol: 'Embedded Local IPC',
      storage: 'WAL-Mode SQLite Database',
      telemetry: {
        active_conversations: 78,
        wal_mode: 'enabled',
        avg_session_depth: 6.4,
        cache_hit_rate: '99.4%'
      }
    },
    'qdrant-db': {
      type: 'VECTOR DATABASE PLATFORM',
      title: 'Qdrant Vector DB (Botzilla)',
      status: 'OPERATIONAL',
      desc: 'High-performance vector database powering the Botzilla enterprise RAG platform. Guarantees hardware-enforced document namespace isolation between departments.',
      latency: '< 35ms ANN Retrieval',
      security: 'Per-Team Namespace Isolation',
      protocol: 'gRPC / HTTP REST',
      storage: 'HNSW Dense Vector Indexes',
      telemetry: {
        collections: 'isolated_team_namespaces',
        vector_dim: 1536,
        index_type: 'HNSW_m16_ef100',
        quantization: 'scalar_8bit',
        cross_team_leak_prevention: 'STRICT_ENFORCED'
      }
    },
    'agent-sales': {
      type: 'PRODUCTION AGENT 02',
      title: 'Agentic AI — Sales Data Agent',
      status: 'IN PRODUCTION',
      desc: 'Converts natural language queries into executed PL/SQL and visual charts with zero database access required from end users and strict no-data-exposure controls.',
      latency: '< 1.4s Intent to Chart',
      security: 'Zero Raw DB Dump Guarantee',
      protocol: 'Internal Agent RPC',
      storage: 'Stateless Worker',
      telemetry: {
        agent_id: 'sales_agent_v3',
        sql_injection_defense: 'parameterized_ast_verified',
        viz_generator: 'chartjs_svg_render',
        adoption: 'sales_finance_operations'
      }
    },
    'agent-botzilla': {
      type: 'PRODUCTION AGENT 09',
      title: 'Botzilla Enterprise RAG Chatbot',
      status: 'IN PRODUCTION',
      desc: 'Retrieval-Augmented Generation chatbot delivering grounded answers in 5–15 seconds over private enterprise document collections without any external data leakage.',
      latency: '5–15s Grounded Search',
      security: 'Strict Enterprise Perimeter',
      protocol: 'LangChain Retrieval Pipeline',
      storage: 'Qdrant Collection Namespace',
      telemetry: {
        agent_id: 'botzilla_rag_v2',
        retrieval_strategy: 'hybrid_dense_sparse',
        grounding_score_min: 0.88,
        citation_transparency: 'line_level_grounding'
      }
    },
    'agent-kam': {
      type: 'PRODUCTION AGENT 06',
      title: 'Key Account Manager (KAM) Agent',
      status: 'IN PRODUCTION',
      desc: 'Action-capable agent allowing Key Account Managers to check mobile number availability and reassign corporate numbers via live telecom tool calling.',
      latency: '< 850ms Tool Execution',
      security: 'Privileged Telecom API Tokens',
      protocol: 'Tool Calling / REST Gateway',
      storage: 'Transaction Audit Log',
      telemetry: {
        agent_id: 'kam_tool_agent',
        capabilities: ['msisdn_check', 'line_reassign', 'account_audit'],
        audit_trail: 'full_immutable_log',
        ticket_reduction_pct: 78
      }
    },
    'agent-marketing': {
      type: 'PRODUCTION AGENT 03',
      title: 'Marketing Intelligence Agent',
      status: 'IN PRODUCTION',
      desc: 'Autonomously crawls competitor portals, extracts current packages and devices, and builds side-by-side market comparison matrices with strategic pricing advice.',
      latency: 'Async Scheduled Batch',
      security: 'Rate-Limited Web Extractor',
      protocol: 'Headless Browser / RAG',
      storage: 'Market Intel Repository',
      telemetry: {
        agent_id: 'marketing_intel_v1',
        crawled_domains: ['competitor_a', 'competitor_b'],
        comparison_matrix: 'live_updated',
        recommendation_engine: 'pricing_differential_gpt4'
      }
    },
    'agent-talent': {
      type: 'PRODUCTION AGENT 04',
      title: 'LinkedIn Talent Hunting Agent',
      status: 'IN PRODUCTION',
      desc: 'Searches and ranks LinkedIn candidate profiles conversationally based on skill sets, education, and pedigree, delivering top 10 matches automatically.',
      latency: '< 4.2s Sourcing Query',
      security: 'Anonymized Candidate Scoring',
      protocol: 'LinkedIn Graph API / NLP',
      storage: 'Temporary Sourcing Cache',
      telemetry: {
        agent_id: 'talent_hunting_agent',
        ranking_metric: 'semantic_skill_fit',
        top_candidates_returned: 10,
        recruiter_time_saved_pct: 65
      }
    },
    'agent-interview': {
      type: 'PRODUCTION AGENT 05',
      title: 'Interview Screening Agent',
      status: 'IN PRODUCTION',
      desc: 'Scores candidate CVs against job specifications, generates custom interview questions, conducts English conversational phone screenings, and drafts evaluation reports.',
      latency: 'Real-time Conversational',
      security: 'Candidate Consent Encrypted',
      protocol: 'Voice AI / STT / TTS',
      storage: 'HR Candidate Record',
      telemetry: {
        agent_id: 'voice_interview_screener',
        scoring_dimensions: ['technical_depth', 'communication', 'experience'],
        auto_report_format: 'structured_pdf_eval'
      }
    },
    'agent-crm': {
      type: 'PRODUCTION AGENT 07',
      title: 'CRM Testing Agent',
      status: 'IN PRODUCTION',
      desc: 'Executes QA test scenarios described in natural language against the new in-house CRM, validating workflows and capturing regression logs.',
      latency: 'Automated Test Batch',
      security: 'Staging & Sandbox Execution',
      protocol: 'CRM API Suite / Headless Test',
      storage: 'QA Test Artifacts',
      telemetry: {
        agent_id: 'crm_qa_automation_agent',
        scenario_parse_accuracy: 0.98,
        coverage_boost: '3.4x faster release gates'
      }
    },
    'agent-doc': {
      type: 'PRODUCTION AGENT 08',
      title: 'Documentation Generator Agent',
      status: 'IN PRODUCTION',
      desc: 'Inspects project code and architecture notes at release time to generate complete, standardized technical documentation and OpenAPI specifications.',
      latency: '< 8s Full Repo Doc Gen',
      security: 'Read-Only Code Access',
      protocol: 'Git Context Ingestion',
      storage: 'Markdown & Confluence Export',
      telemetry: {
        agent_id: 'doc_gen_agent',
        output_format: 'markdown_and_openapi',
        consistency_rating: '100% template alignment'
      }
    },
    'backend-db': {
      type: 'CORE TELECOM DATABASE',
      title: 'Oracle Telecom Database',
      status: 'ONLINE · REPLICATED',
      desc: 'Production Oracle enterprise database containing transactional billing, customer, and plan records. Accessed strictly through parameterized queries.',
      latency: '< 15ms Query Response',
      security: 'Read-Only Sandbox / Zero DDL',
      protocol: 'Oracle Net / PL/SQL',
      storage: 'Enterprise Oracle Cluster',
      telemetry: {
        db_engine: 'Oracle Enterprise 19c',
        connection_pool: 'monitored_oracle_cx',
        ddl_lockout: 'HARD_ENFORCED',
        audit_logging: 'active'
      }
    },
    'backend-pyspark': {
      type: 'DISTRIBUTED COMPUTE CLUSTER',
      title: 'PySpark Distributed Processing',
      status: 'OPTIMIZED (<10m RUNTIME)',
      desc: 'Distributed PySpark cluster for reconciliation pipelines, re-engineered to slash runtimes from 8 hours to under 10 minutes, generating massive cost savings.',
      latency: '< 10 mins (Down from 8 Hours)',
      security: 'Enterprise Data Lake Security',
      protocol: 'Apache Spark Distributed DAG',
      storage: 'HDFS / Object Storage',
      telemetry: {
        engine: 'Apache Spark 3.4 on PySpark',
        runtime_prior: '8 hours',
        runtime_optimized: '8.4 minutes',
        cost_savings_contribution: '~4M JOD delivered impact'
      }
    },
    'backend-telecom-api': {
      type: 'TELECOM OPERATIONS API',
      title: 'Billing & SIM Provisioning APIs',
      status: 'LIVE GATEWAY',
      desc: 'Core telecom operational APIs for checking MSISDN availability, SIM activation, plan assignments, and billing modifications.',
      latency: '< 95ms API Response',
      security: 'OAuth 2.0 / Mutual TLS',
      protocol: 'REST / SOAP Telecom Gateway',
      storage: 'HLR / HSS / Billing Core',
      telemetry: {
        endpoint: 'https://core-telecom.zain.internal/api/v2',
        actions_supported: ['msisdn_reserve', 'line_swap', 'plan_adjust'],
        uptime: '99.99%'
      }
    }
  };

  // Simulation Script Definitions
  const simulationScripts = {
    sales: {
      steps: [
        { node: 'web-client', log: '[INGRESS] Sales VP asks: "Show Q3 5G handset revenue grouped by Amman vs Irbid branches with chart"' },
        { node: 'orchestrator', log: '[ROUTING] Intent detected: SALES_ANALYTICS_QUERY (conf: 0.992) -> Dispatched to Sales Agent' },
        { node: 'redis-mq', log: '[QUEUE] Task enqueued in redis_sales_priority_queue (queue depth: 1)' },
        { node: 'agent-sales', log: '[AGENT] Agentic AI parses enterprise schema -> Generates parameterized PL/SQL query with zero raw exposure' },
        { node: 'backend-db', log: '[DATABASE] Executing SELECT branch, SUM(rev) FROM tbl_sales WHERE period="Q3" GROUP BY branch' },
        { node: 'agent-sales', log: '[SYNTHESIS] Processing rowset -> Generating Chart.js visualization payload & summary statistics' },
        { node: 'orchestrator', log: '[COMPLETION] Response payload aggregated & returned to Web UI. Total time: 740ms' }
      ]
    },
    botzilla: {
      steps: [
        { node: 'web-client', log: '[INGRESS] User submits query: "What are the compliance rules for corporate fiber SLA penalties?"' },
        { node: 'orchestrator', log: '[ROUTING] Intent: BOTZILLA_RAG_SEARCH -> Validating enterprise department namespace token' },
        { node: 'redis-mq', log: '[QUEUE] Redis worker assigned: Botzilla RAG Pipeline Worker 04' },
        { node: 'agent-botzilla', log: '[EMBEDDING] Generating text embeddings via OpenAI text-embedding-3-small' },
        { node: 'qdrant-db', log: '[QDRANT] Querying collection "finance_legal_isolated_ns" with strict namespace filter' },
        { node: 'agent-botzilla', log: '[SYNTHESIS] Retrieved 4 relevant chunks -> Synthesizing grounded response with citations' },
        { node: 'orchestrator', log: '[COMPLETION] Verified grounded response in 6.4s with zero external data leakage' }
      ]
    },
    kam: {
      steps: [
        { node: 'web-client', log: '[INGRESS] KAM user submits: "Check availability of 078-503-xxxx and reassign to Corporate VIP account 4410"' },
        { node: 'orchestrator', log: '[ROUTING] Action-capable intent detected: KAM_TELECOM_OPERATION' },
        { node: 'agent-kam', log: '[TOOL CALL 1] Tool dispatched: check_number_status(078503xxxx)' },
        { node: 'backend-telecom-api', log: '[TELECOM API] HLR response: 078503xxxx is UNALLOCATED / AVAILABLE_VIP' },
        { node: 'agent-kam', log: '[TOOL CALL 2] Tool dispatched: execute_line_reassignment(account=4410, number=078503xxxx)' },
        { node: 'backend-telecom-api', log: '[PROVISIONING] Line provisioned successfully in telecom billing engine' },
        { node: 'orchestrator', log: '[COMPLETION] Reassignment complete. Action audit record logged in 820ms' }
      ]
    },
    marketing: {
      steps: [
        { node: 'orchestrator', log: '[CRON] Scheduled marketing watch triggered for competitive intelligence' },
        { node: 'agent-marketing', log: '[SCRAPING] Headless scraper extracting postpaid 5G promotional bundles from competitor portals' },
        { node: 'agent-marketing', log: '[NORMALIZATION] Parsing data plans, device subsidies, and fair usage limits' },
        { node: 'backend-db', log: '[COMPARISON] Retrieving Zain Jordan active promotional portfolio' },
        { node: 'agent-marketing', log: '[RECOMMENDATION] Generating differential analysis & strategic bundle suggestions' },
        { node: 'orchestrator', log: '[COMPLETION] Marketing executive briefing generated and dispatched' }
      ]
    },
    talent: {
      steps: [
        { node: 'web-client', log: '[INGRESS] HR Recruiter: "Find top 10 Senior AI Platform Engineers with PySpark & LangChain"' },
        { node: 'orchestrator', log: '[ROUTING] Sourcing intent routed to LinkedIn Talent Hunting Agent' },
        { node: 'agent-talent', log: '[NLP SEARCH] Querying profile database with semantic skills: PySpark, LangChain, LLMOps' },
        { node: 'agent-talent', log: '[RANKING] Multi-attribute scoring evaluated: 142 profiles parsed -> Top 10 shortlisted' },
        { node: 'orchestrator', log: '[COMPLETION] Structured candidate roster with match rationale returned to HR in 3.8s' }
      ]
    }
  };

  // DOM Elements
  const nodes = document.querySelectorAll('.arch-node');
  const inspectType = document.getElementById('inspect-type');
  const inspectTitle = document.getElementById('inspect-title');
  const inspectStatus = document.getElementById('inspect-status');
  const inspectDesc = document.getElementById('inspect-desc');
  const inspectLatency = document.getElementById('inspect-latency');
  const inspectSecurity = document.getElementById('inspect-security');
  const inspectProtocol = document.getElementById('inspect-protocol');
  const inspectStorage = document.getElementById('inspect-storage');
  const inspectCode = document.getElementById('inspect-code');
  const simSelector = document.getElementById('sim-scenario-selector');
  const simBtn = document.getElementById('btn-trigger-sim');
  const simLogText = document.getElementById('sim-log-text');

  let currentSelectedNode = 'orchestrator';
  let isSimulating = false;

  function init() {
    // Attach click events to all architectural nodes
    nodes.forEach(node => {
      node.addEventListener('click', () => {
        const nodeId = node.getAttribute('data-node');
        if (nodeId && nodeDatabase[nodeId]) {
          selectNode(nodeId);
        }
      });
    });

    // Simulation button trigger
    if (simBtn) {
      simBtn.addEventListener('click', runSimulation);
    }

    // Set initial node selection
    selectNode('orchestrator');
  }

  function selectNode(nodeId) {
    currentSelectedNode = nodeId;
    const data = nodeDatabase[nodeId];
    if (!data) return;

    // Update active highlight classes
    nodes.forEach(n => {
      if (n.getAttribute('data-node') === nodeId) {
        n.classList.add('selected');
      } else {
        n.classList.remove('selected');
      }
    });

    // Populate inspector panel
    if (inspectType) inspectType.textContent = data.type;
    if (inspectTitle) inspectTitle.textContent = data.title;
    if (inspectStatus) inspectStatus.textContent = data.status;
    if (inspectDesc) inspectDesc.textContent = data.desc;
    if (inspectLatency) inspectLatency.textContent = data.latency;
    if (inspectSecurity) inspectSecurity.textContent = data.security;
    if (inspectProtocol) inspectProtocol.textContent = data.protocol;
    if (inspectStorage) inspectStorage.textContent = data.storage;

    // Format telemetry JSON
    if (inspectCode) {
      inspectCode.innerHTML = syntaxHighlightJson(data.telemetry);
    }
  }

  function runSimulation() {
    if (isSimulating) return;
    const scenarioKey = simSelector ? simSelector.value : 'sales';
    const script = simulationScripts[scenarioKey];
    if (!script) return;

    isSimulating = true;
    if (simBtn) {
      simBtn.disabled = true;
      simBtn.classList.add('btn-secondary');
      simBtn.classList.remove('btn-primary');
    }

    // Clear previous pulse animations
    nodes.forEach(n => n.classList.remove('active-packet'));

    let stepIndex = 0;
    function executeStep() {
      if (stepIndex >= script.steps.length) {
        // Simulation finished
        if (simLogText) {
          simLogText.textContent = `[SIMULATION COMPLETED] Flow verified successfully with zero errors.`;
        }
        nodes.forEach(n => n.classList.remove('active-packet'));
        isSimulating = false;
        if (simBtn) {
          simBtn.disabled = false;
          simBtn.classList.add('btn-primary');
          simBtn.classList.remove('btn-secondary');
        }
        return;
      }

      const step = script.steps[stepIndex];
      // Highlight corresponding node
      nodes.forEach(n => {
        if (n.getAttribute('data-node') === step.node) {
          n.classList.add('active-packet');
          // Update inspector in sync
          selectNode(step.node);
        } else {
          n.classList.remove('active-packet');
        }
      });

      // Update log text
      if (simLogText) {
        simLogText.textContent = step.log;
      }

      stepIndex++;
      setTimeout(executeStep, 1300);
    }

    executeStep();
  }

  function syntaxHighlightJson(jsonObj) {
    const jsonStr = JSON.stringify(jsonObj, null, 2);
    return jsonStr.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      function (match) {
        let cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'keyword';
          } else {
            cls = 'string';
          }
        }
        return '<span class="' + cls + '">' + match + '</span>';
      }
    );
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
