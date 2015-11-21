<Request>
    <Head>
        <Function>TB_SATISFACTION</Function>
        <Operation>0</Operation>
    </Head>
    <Body>
        <TB_SATISFACTION>
            <UNIT_CODE><%= unit_code %></UNIT_CODE>
            <UNIT_NAME><%= unit_name %></UNIT_NAME>
            <PATIENT_CODE><%= patient_code %></PATIENT_CODE>
            <VISIT_NO><%= visit_no %></VISIT_NO>
            <SATISFACTION><%= satisfaction %></SATISFACTION>
            <SATISFACTION_CONTENT><%= satisfaction_content %></SATISFACTION_CONTENT>
            <VISIT_DATE_TIME><%= visit_date_time %></VISIT_DATE_TIME>
            <RECORD_DATE_TIME><%= record_date_time %></RECORD_DATE_TIME>
            <VISIT_TYPE><%= visit_type %></VISIT_TYPE>
        </TB_SATISFACTION>
    </Body>
</Request>
