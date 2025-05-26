export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_chat_history: {
        Row: {
          content: string
          created_at: string | null
          founder_id: string
          id: string
          message_type: string
          session_id: string
          timestamp: string
        }
        Insert: {
          content: string
          created_at?: string | null
          founder_id: string
          id?: string
          message_type: string
          session_id: string
          timestamp?: string
        }
        Update: {
          content?: string
          created_at?: string | null
          founder_id?: string
          id?: string
          message_type?: string
          session_id?: string
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_chat_history_founder_id_fkey"
            columns: ["founder_id"]
            isOneToOne: false
            referencedRelation: "founders"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          cik: string
          cik_lookup_status: string | null
          company_name: string | null
          created_at: string
          id: string
          name: string
          num_historical_years: number | null
        }
        Insert: {
          cik: string
          cik_lookup_status?: string | null
          company_name?: string | null
          created_at?: string
          id?: string
          name: string
          num_historical_years?: number | null
        }
        Update: {
          cik?: string
          cik_lookup_status?: string | null
          company_name?: string | null
          created_at?: string
          id?: string
          name?: string
          num_historical_years?: number | null
        }
        Relationships: []
      }
      conversation_messages: {
        Row: {
          content: string
          conversation_id: string
          id: string
          metadata: Json | null
          rich_content: Json | null
          sender_type: string
          sender_user_id: string | null
          timestamp: string | null
        }
        Insert: {
          content: string
          conversation_id: string
          id?: string
          metadata?: Json | null
          rich_content?: Json | null
          sender_type: string
          sender_user_id?: string | null
          timestamp?: string | null
        }
        Update: {
          content?: string
          conversation_id?: string
          id?: string
          metadata?: Json | null
          rich_content?: Json | null
          sender_type?: string
          sender_user_id?: string | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_conversation_messages_conversation_id"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "project_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_conversation_messages_sender_user_id"
            columns: ["sender_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      Documents: {
        Row: {
          content: string | null
          created_at: string
          embedding: string | null
          id: number
          metadata: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          embedding?: string | null
          id?: number
          metadata?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          embedding?: string | null
          id?: number
          metadata?: string | null
        }
        Relationships: []
      }
      employees: {
        Row: {
          created_at: string | null
          department: string | null
          email: string
          first_name: string
          id: number
          job_title: string | null
          last_name: string
          manager_id: number | null
          notes: string | null
          phone: string | null
          profile_image_url: string | null
          start_date: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          email: string
          first_name: string
          id?: number
          job_title?: string | null
          last_name: string
          manager_id?: number | null
          notes?: string | null
          phone?: string | null
          profile_image_url?: string | null
          start_date?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          email?: string
          first_name?: string
          id?: number
          job_title?: string | null
          last_name?: string
          manager_id?: number | null
          notes?: string | null
          phone?: string | null
          profile_image_url?: string | null
          start_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_data: {
        Row: {
          company_id: string
          created_at: string
          fiscal_year: number
          id: string
          line_item_name: string
          statement_type: string
          value: number | null
        }
        Insert: {
          company_id: string
          created_at?: string
          fiscal_year: number
          id?: string
          line_item_name: string
          statement_type: string
          value?: number | null
        }
        Update: {
          company_id?: string
          created_at?: string
          fiscal_year?: number
          id?: string
          line_item_name?: string
          statement_type?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "financial_data_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_facts: {
        Row: {
          accession_number: string
          company_id: string | null
          created_at: string | null
          fact_description: string | null
          fact_label: string | null
          fact_name: string
          filing_date: string
          fiscal_period: string | null
          fiscal_year: number | null
          form_type: string
          frame: string | null
          id: string
          period_end_date: string
          period_start_date: string | null
          taxonomy: string
          unit: string
          value: number
        }
        Insert: {
          accession_number: string
          company_id?: string | null
          created_at?: string | null
          fact_description?: string | null
          fact_label?: string | null
          fact_name: string
          filing_date: string
          fiscal_period?: string | null
          fiscal_year?: number | null
          form_type: string
          frame?: string | null
          id?: string
          period_end_date: string
          period_start_date?: string | null
          taxonomy: string
          unit: string
          value: number
        }
        Update: {
          accession_number?: string
          company_id?: string | null
          created_at?: string | null
          fact_description?: string | null
          fact_label?: string | null
          fact_name?: string
          filing_date?: string
          fiscal_period?: string | null
          fiscal_year?: number | null
          form_type?: string
          frame?: string | null
          id?: string
          period_end_date?: string
          period_start_date?: string | null
          taxonomy?: string
          unit?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "financial_facts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      founder_projects: {
        Row: {
          created_at: string | null
          custom_instructions: string | null
          description: string | null
          founder_id: string
          id: string
          name: string
          owner_user_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          custom_instructions?: string | null
          description?: string | null
          founder_id: string
          id?: string
          name: string
          owner_user_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          custom_instructions?: string | null
          description?: string | null
          founder_id?: string
          id?: string
          name?: string
          owner_user_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_founder_projects_founder_id"
            columns: ["founder_id"]
            isOneToOne: true
            referencedRelation: "founders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_founder_projects_owner_user_id"
            columns: ["owner_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      founders: {
        Row: {
          arr: number | null
          avatar: string | null
          bio: string | null
          call_recordings_count: number | null
          churn_rate: number | null
          company_name: string
          created_at: string | null
          current_stage: string | null
          customer_count: number | null
          documents_count: number | null
          email_threads_count: number | null
          first_interaction: string | null
          growth_rate: number | null
          id: string
          last_interaction: string | null
          meeting_notes_count: number | null
          name: string
          stage: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          arr?: number | null
          avatar?: string | null
          bio?: string | null
          call_recordings_count?: number | null
          churn_rate?: number | null
          company_name: string
          created_at?: string | null
          current_stage?: string | null
          customer_count?: number | null
          documents_count?: number | null
          email_threads_count?: number | null
          first_interaction?: string | null
          growth_rate?: number | null
          id?: string
          last_interaction?: string | null
          meeting_notes_count?: number | null
          name: string
          stage?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          arr?: number | null
          avatar?: string | null
          bio?: string | null
          call_recordings_count?: number | null
          churn_rate?: number | null
          company_name?: string
          created_at?: string | null
          current_stage?: string | null
          customer_count?: number | null
          documents_count?: number | null
          email_threads_count?: number | null
          first_interaction?: string | null
          growth_rate?: number | null
          id?: string
          last_interaction?: string | null
          meeting_notes_count?: number | null
          name?: string
          stage?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      hinton_database: {
        Row: {
          Active: string | null
          "Actual Grad": string | null
          Age: number | null
          "Class Type": string | null
          Closed: string | null
          "Contract Date": string | null
          Course: string | null
          DOB: string | null
          Drop: string | null
          Education: string | null
          Email: string | null
          Enrollment: string | null
          "Graduate Status": string | null
          HighSchoolGrad: string | null
          HourCount: number | null
          id: number
          "LoanAmount ": string | null
          Marital: string | null
          Name: string | null
          PhoneNumber: string | null
          Race: string | null
          Referral: string | null
          RequiredHours: number | null
          SAP: string | null
          Sex: string | null
          Start: string | null
          StudentID: string | null
          "Title IV Elig": string | null
          "Tracking Code": string | null
          Veteran: string | null
        }
        Insert: {
          Active?: string | null
          "Actual Grad"?: string | null
          Age?: number | null
          "Class Type"?: string | null
          Closed?: string | null
          "Contract Date"?: string | null
          Course?: string | null
          DOB?: string | null
          Drop?: string | null
          Education?: string | null
          Email?: string | null
          Enrollment?: string | null
          "Graduate Status"?: string | null
          HighSchoolGrad?: string | null
          HourCount?: number | null
          id?: number
          "LoanAmount "?: string | null
          Marital?: string | null
          Name?: string | null
          PhoneNumber?: string | null
          Race?: string | null
          Referral?: string | null
          RequiredHours?: number | null
          SAP?: string | null
          Sex?: string | null
          Start?: string | null
          StudentID?: string | null
          "Title IV Elig"?: string | null
          "Tracking Code"?: string | null
          Veteran?: string | null
        }
        Update: {
          Active?: string | null
          "Actual Grad"?: string | null
          Age?: number | null
          "Class Type"?: string | null
          Closed?: string | null
          "Contract Date"?: string | null
          Course?: string | null
          DOB?: string | null
          Drop?: string | null
          Education?: string | null
          Email?: string | null
          Enrollment?: string | null
          "Graduate Status"?: string | null
          HighSchoolGrad?: string | null
          HourCount?: number | null
          id?: number
          "LoanAmount "?: string | null
          Marital?: string | null
          Name?: string | null
          PhoneNumber?: string | null
          Race?: string | null
          Referral?: string | null
          RequiredHours?: number | null
          SAP?: string | null
          Sex?: string | null
          Start?: string | null
          StudentID?: string | null
          "Title IV Elig"?: string | null
          "Tracking Code"?: string | null
          Veteran?: string | null
        }
        Relationships: []
      }
      milestones: {
        Row: {
          completed: boolean | null
          created_at: string | null
          date: string | null
          description: string | null
          founder_id: string
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          founder_id: string
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          founder_id?: string
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "milestones_founder_id_fkey"
            columns: ["founder_id"]
            isOneToOne: false
            referencedRelation: "founders"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      project_conversations: {
        Row: {
          created_at: string | null
          id: string
          project_id: string
          started_by_user_id: string | null
          summary: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          project_id: string
          started_by_user_id?: string | null
          summary?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          project_id?: string
          started_by_user_id?: string | null
          summary?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_project_conversations_project_id"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "founder_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_project_conversations_started_by_user_id"
            columns: ["started_by_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      project_resources: {
        Row: {
          content_hash: string | null
          created_at: string | null
          description: string | null
          file_mime_type: string | null
          file_size_bytes: number | null
          id: string
          metadata: Json | null
          name: string
          project_id: string
          resource_type: string
          source_url: string | null
          updated_at: string | null
          uploaded_by_user_id: string | null
        }
        Insert: {
          content_hash?: string | null
          created_at?: string | null
          description?: string | null
          file_mime_type?: string | null
          file_size_bytes?: number | null
          id?: string
          metadata?: Json | null
          name: string
          project_id: string
          resource_type: string
          source_url?: string | null
          updated_at?: string | null
          uploaded_by_user_id?: string | null
        }
        Update: {
          content_hash?: string | null
          created_at?: string | null
          description?: string | null
          file_mime_type?: string | null
          file_size_bytes?: number | null
          id?: string
          metadata?: Json | null
          name?: string
          project_id?: string
          resource_type?: string
          source_url?: string | null
          updated_at?: string | null
          uploaded_by_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_project_resources_project_id"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "founder_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_project_resources_uploaded_by_user_id"
            columns: ["uploaded_by_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          budget: number | null
          created_at: string | null
          description: string | null
          end_date: string | null
          id: number
          manager_id: number | null
          name: string
          start_date: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          budget?: number | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: number
          manager_id?: number | null
          name: string
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          budget?: number | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: number
          manager_id?: number | null
          name?: string
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      resources: {
        Row: {
          associated_founder_ids: string[] | null
          created_at: string | null
          description: string | null
          file_type: string | null
          file_url: string | null
          founder_id: string | null
          id: string
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          type: string
          updated_at: string | null
          uploaded_at: string | null
        }
        Insert: {
          associated_founder_ids?: string[] | null
          created_at?: string | null
          description?: string | null
          file_type?: string | null
          file_url?: string | null
          founder_id?: string | null
          id?: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          type: string
          updated_at?: string | null
          uploaded_at?: string | null
        }
        Update: {
          associated_founder_ids?: string[] | null
          created_at?: string | null
          description?: string | null
          file_type?: string | null
          file_url?: string | null
          founder_id?: string | null
          id?: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          type?: string
          updated_at?: string | null
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resources_founder_id_fkey"
            columns: ["founder_id"]
            isOneToOne: false
            referencedRelation: "founders"
            referencedColumns: ["id"]
          },
        ]
      }
      secrets: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      smartshared_transactions: {
        Row: {
          adjustments: number | null
          card: number | null
          cash: number | null
          check_number: string | null
          disbursement: number | null
          fee: number | null
          full_name: string | null
          id: number
          kit_and_book: number | null
          ledger_type_misc: number | null
          misc: number | null
          net_amount: number | null
          new_balance: number | null
          other: number | null
          penalty: number | null
          program: string | null
          refund: number | null
          total_canceled: string | null
          total_charges: number | null
          total_receipts: string | null
          total_write_off: string | null
          transaction_date: string | null
          tuition: number | null
          write_off: number | null
        }
        Insert: {
          adjustments?: number | null
          card?: number | null
          cash?: number | null
          check_number?: string | null
          disbursement?: number | null
          fee?: number | null
          full_name?: string | null
          id?: number
          kit_and_book?: number | null
          ledger_type_misc?: number | null
          misc?: number | null
          net_amount?: number | null
          new_balance?: number | null
          other?: number | null
          penalty?: number | null
          program?: string | null
          refund?: number | null
          total_canceled?: string | null
          total_charges?: number | null
          total_receipts?: string | null
          total_write_off?: string | null
          transaction_date?: string | null
          tuition?: number | null
          write_off?: number | null
        }
        Update: {
          adjustments?: number | null
          card?: number | null
          cash?: number | null
          check_number?: string | null
          disbursement?: number | null
          fee?: number | null
          full_name?: string | null
          id?: number
          kit_and_book?: number | null
          ledger_type_misc?: number | null
          misc?: number | null
          net_amount?: number | null
          new_balance?: number | null
          other?: number | null
          penalty?: number | null
          program?: string | null
          refund?: number | null
          total_canceled?: string | null
          total_charges?: number | null
          total_receipts?: string | null
          total_write_off?: string | null
          transaction_date?: string | null
          tuition?: number | null
          write_off?: number | null
        }
        Relationships: []
      }
      users: {
        Row: {
          auth_user_id: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_api_key: {
        Args: { service: string }
        Returns: string
      }
    }
    Enums: {
      communication_log_status: "Sent" | "Failed" | "Pending"
      communication_type: "Email" | "SMS" | "InAppNotification"
      document_category:
        | "Enrollment"
        | "Compliance"
        | "Student Record"
        | "Financial"
        | "Other"
      financial_transaction_type:
        | "TuitionCharge"
        | "FeeCharge"
        | "PaymentReceived"
        | "FinAidDisbursement"
        | "Refund"
        | "Adjustment"
      practical_log_status: "Pending Verification" | "Approved" | "Denied"
      survey_assignment_status:
        | "Assigned"
        | "In Progress"
        | "Completed"
        | "Overdue"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      communication_log_status: ["Sent", "Failed", "Pending"],
      communication_type: ["Email", "SMS", "InAppNotification"],
      document_category: [
        "Enrollment",
        "Compliance",
        "Student Record",
        "Financial",
        "Other",
      ],
      financial_transaction_type: [
        "TuitionCharge",
        "FeeCharge",
        "PaymentReceived",
        "FinAidDisbursement",
        "Refund",
        "Adjustment",
      ],
      practical_log_status: ["Pending Verification", "Approved", "Denied"],
      survey_assignment_status: [
        "Assigned",
        "In Progress",
        "Completed",
        "Overdue",
      ],
    },
  },
} as const
